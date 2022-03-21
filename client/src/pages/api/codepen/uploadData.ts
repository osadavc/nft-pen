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

  const { htmlData } = req.body as {
    htmlData: string;
  };

  if (!htmlData) {
    res.status(400).json({
      message: "Missing htmlData",
    });

    return;
  }

  const timestamp = Date.now();

  await fs.promises.writeFile(`public/codepens/${timestamp}.html`, htmlData);
  const responseFromPinata = await pinataClient.pinFromFS(
    `public/codepens/${timestamp}.html`
  );
  await fs.promises.unlink(`public/codepens/${timestamp}.html`);

  res.json({
    fileURL: responseFromPinata.IpfsHash,
  });
};

export default handler;
