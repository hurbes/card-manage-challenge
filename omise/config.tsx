// src/config.ts
import { createContext, useContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const OMISE_SCRIPTS = {
  primary: "https://cdn.omise.co/omise.js.gz",
  secondary: "https://cdn2.omise.co/omise.js.gz",
};

// Define the shape of the API configuration context
interface APIConfig {
  publicKey: string;
  secretKey?: string; // Optional for secret key
  apiVersion: string;
  vaultApiVersion?: string; // Optional for Vault API
}

// Create the API configuration context with default values
const APIConfigContext = createContext<APIConfig | undefined>(undefined);

const queryClient = new QueryClient();

// Create a provider component for the API configuration
export const OmiseConfigProvider: React.FC<{
  config: APIConfig;
  children: React.ReactNode;
}> = ({ config, children }) => {
  return (
    <APIConfigContext.Provider value={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </APIConfigContext.Provider>
  );
};

// Custom hook to use the API configuration context
export const useOmiseConfig = (): APIConfig => {
  const context = useContext(APIConfigContext);
  if (!context) {
    throw new Error("useAPIConfig must be used within an APIConfigProvider");
  }
  return context;
};
