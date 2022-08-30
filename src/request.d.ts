// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};

declare global {
  namespace Express {
    interface User {
        id: string;
        displayName: string;
        newUser?: boolean;
      };
    }
  }
}
