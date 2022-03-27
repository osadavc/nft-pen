let PINATA_API_KEY;
let PINATA_API_SECRET;

let GOOGLE_CLIENT_ID;
let GOOGLE_CLIENT_SECRET;

let NEXTAUTH_SECRET;

try {
  PINATA_API_KEY = process.env.PINATA_API_KEY;
  PINATA_API_SECRET = process.env.PINATA_API_SECRET;

  GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

  NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
} catch (error) {}

export const pinataAPIKey = PINATA_API_KEY ?? "";
export const pinataAPISecret = PINATA_API_SECRET ?? "";

export const googleClientId = GOOGLE_CLIENT_ID ?? "";
export const googleClientSecret = GOOGLE_CLIENT_SECRET ?? "";

export const nextauthSecret = NEXTAUTH_SECRET ?? "";

export const contractAddress =
  null ?? "0x04d4CC7fae00065Ebfd2422C064fa9615b18Ec13";
