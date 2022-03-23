import { NextApiHandler } from "next";
import fs from "fs";
import axios from "axios";
import pinataClient from "../../../utils/pinataClient";

const handler: NextApiHandler = async (req, res) => {
  if (req.method != "POST") {
    return res.status(405).json({
      statusCode: 405,
      message: "Method not allowed",
    });
  }

  const { htmlData, userName, NFTName, penId } = req.body as {
    htmlData: string;
    userName: string;
    NFTName: string;
    penId: string;
  };

  if (!htmlData || !userName || !NFTName || !penId) {
    res.status(400).json({
      message: "Missing htmlData",
    });

    return;
  }

  const timestamp = getTimeStamp();

  await fs.promises.writeFile(`public/codepens/${timestamp}.html`, htmlData);

  const imageWriter = fs.createWriteStream(`public/codepens/${timestamp}.jpg`);
  (
    await axios({
      url: `https://shots.codepen.io/${userName}/pen/${penId}-1280.jpg`,
      method: "GET",
      responseType: "stream",
    })
  ).data.pipe(imageWriter);

  const pinataHTMLUpload = await pinataClient.pinFromFS(
    `public/codepens/${timestamp}.html`
  );
  const pinataImageUpload = await pinataClient.pinFromFS(
    `public/codepens/${timestamp}.jpg`
  );

  const pinataMetaUpload = await pinataClient.pinJSONToIPFS({
    name: NFTName,
    description: `${NFTName} by ${userName}`,
    attributes: [
      {
        trait_type: "User Name",
        value: userName,
      },
    ],
    image: `ipfs://${pinataImageUpload.IpfsHash}`,
    animation_url: `ipfs://${pinataHTMLUpload.IpfsHash}`,
  });

  await fs.promises.unlink(`public/codepens/${timestamp}.html`);
  await fs.promises.unlink(`public/codepens/${timestamp}.jpg`);

  res.status(200).json({
    imageURL: pinataHTMLUpload.IpfsHash,
    metaDataURL: pinataMetaUpload.IpfsHash,
  });
};

const getTimeStamp = () => Date.now();

export default handler;
