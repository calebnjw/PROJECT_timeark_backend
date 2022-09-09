// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_USERNAME: string;
      MONGO_PASSWORD: string;
      MONGO_NAME: string;
      MONGO_URI: string;

      PORT: number;
      FRONTEND_URL: string;
      NODE_ENV: "development" | "production";

      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
    }
  }
}
