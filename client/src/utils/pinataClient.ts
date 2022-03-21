import pinataSDK from "@pinata/sdk";
import * as env from "../config";

const pinataClient = pinataSDK(env.pinataAPIKey, env.pinataAPISecret);

export default pinataClient;
