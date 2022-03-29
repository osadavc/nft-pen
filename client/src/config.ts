let PINATA_API_KEY;
let PINATA_API_SECRET;

let NEXT_PUBLIC_CONTRACT_ADDRESS;
let NEXT_PUBLIC_COLLECTION_NAME;

let GOOGLE_CLIENT_ID;
let GOOGLE_CLIENT_SECRET;

let NEXTAUTH_SECRET;

let NEXT_PUBLIC_GRAPHQL_ENDPOINT;
let HASURA_ADMIN_KEY;

try {
  PINATA_API_KEY = process.env.PINATA_API_KEY;
  PINATA_API_SECRET = process.env.PINATA_API_SECRET;

  NEXT_PUBLIC_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  NEXT_PUBLIC_COLLECTION_NAME = process.env.NEXT_PUBLIC_COLLECTION_NAME;

  GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

  NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

  NEXT_PUBLIC_GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
  HASURA_ADMIN_KEY = process.env.HASURA_ADMIN_KEY;
} catch (error) {
  console.log(error);
}

export const pinataAPIKey = PINATA_API_KEY ?? "";
export const pinataAPISecret = PINATA_API_SECRET ?? "";

export const contractAddress = NEXT_PUBLIC_CONTRACT_ADDRESS ?? "";
export const collectionName = NEXT_PUBLIC_COLLECTION_NAME ?? "";

export const googleClientId = GOOGLE_CLIENT_ID ?? "";
export const googleClientSecret = GOOGLE_CLIENT_SECRET ?? "";

export const nextauthSecret = NEXTAUTH_SECRET ?? "";

export const graphqlEndpoint = NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? "";
export const hasuraAdminKey = HASURA_ADMIN_KEY ?? "";
