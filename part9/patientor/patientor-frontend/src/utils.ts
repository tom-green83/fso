  import { HealthCheckRating } from "./types";
  
  // Helper function for exhaustive type checking
  export const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  export const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

  export const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
  };