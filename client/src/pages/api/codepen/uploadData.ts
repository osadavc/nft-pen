import { NextApiHandler } from "next";
import fs from "fs";
import pinataClient from "../../../utils/pinataClient";

const handler: NextApiHandler = async (req, res) => {
  if (req.method != "POST") {
    return res.status(405).json({
      statusCode: 405,
      message: "Method not allowed",
    });
  }

  const { htmlData, userName, NFTName } = req.body as {
    htmlData: string;
    userName: string;
    NFTName: string;
  };

  if (!htmlData || !userName || !NFTName) {
    res.status(400).json({
      message: "Missing htmlData",
    });

    return;
  }

  const timestamp = Date.now();

  await fs.promises.writeFile(`public/codepens/${timestamp}.html`, htmlData);

  const pinataImageUpload = await pinataClient.pinFromFS(
    `public/codepens/${timestamp}.html`
  );
  const pinataMetaUpload = await pinataClient.pinJSONToIPFS({
    attributes: [
      {
        trait_type: "User Name",
        value: userName,
      },
    ],
    description: `${NFTName} by ${userName}`,
    image: `https://ipfs.io/ipfs/${pinataImageUpload.IpfsHash}`,
    name: NFTName,
  });

  await fs.promises.unlink(`public/codepens/${timestamp}.html`);

  res.status(200).json({
    imageURL: `https://ipfs.io/ipfs/${pinataImageUpload.IpfsHash}`,
    metaDataURL: `https://ipfs.io/ipfs/${pinataMetaUpload.IpfsHash}`,
  });
};

export default handler;
