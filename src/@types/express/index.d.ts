import * as express from "express"

// declare namespace Express {
//   export interface Request {
//     user?: Record<string,any>;
//     decode?: {
//       _id: string;
//     };
//     token: any;
//   }
// }

declare global {
  namespace Express {
      interface Request {
          user?: Record<string,any>;
          // user?: {
          //   _id: string;
          // }
          userToken?: { _id: string; }
          decode?: string | any;
          token?: string;
      }
  }
}
