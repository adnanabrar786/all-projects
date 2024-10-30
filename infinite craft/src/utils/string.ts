export function parseJwt(jwt: string) {
  const token = jwt.split("Bearer ")[1];
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

export function getUserIDFromJWT(jwt: string): string | null {
  if (jwt === "undefined") return null;
  const tokenBody = parseJwt(jwt);
  return tokenBody.username;
}
