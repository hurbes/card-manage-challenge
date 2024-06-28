import { z } from "zod";

const envVariables = z.object({
  EXPO_PUBLIC_PUBLIC_TEST_KEY: z.string(),
  EXPO_PUBLIC_SECRET_TEST_KEY: z.string(),
});

export const ENV = envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
