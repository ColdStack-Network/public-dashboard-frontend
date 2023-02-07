export const extractJwtPayload = <T>(token: string | null): T => {
  if (!token) throw Error(`${token} invalid`);
  const parsedToken = token.split(".");
  const payload = parsedToken[1];
  return JSON.parse(atob(payload)) as T;
};
