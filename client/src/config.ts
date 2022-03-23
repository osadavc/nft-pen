let PINATA_API_KEY;
let PINATA_API_SECRET;

try {
  PINATA_API_KEY = process.env.PINATA_API_KEY;
  PINATA_API_SECRET = process.env.PINATA_API_SECRET;
} catch (error) {}

export const pinataAPIKey = PINATA_API_KEY ?? "";
export const pinataAPISecret = PINATA_API_SECRET ?? "";

export const contractAddress =
  null ?? "0x04d4CC7fae00065Ebfd2422C064fa9615b18Ec13";
