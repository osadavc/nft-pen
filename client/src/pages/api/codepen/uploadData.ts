import { NextApiHandler } from "next";
import { Browser } from "puppeteer";
import getBrowser from "../../../utils/getBrowser";
import pinataClient from "utils/pinataClient";
import fs from "fs";
import path from "path";
import os from "os";

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

  let browser: Browser | null = null;

  try {
    const timestamp = getTimeStamp();

    await fs.promises.mkdir(path.resolve(os.tmpdir(), `codepens/`), {
      recursive: true,
    });
    await fs.promises.writeFile(
      path.resolve(os.tmpdir(), `codepens/${timestamp}.html`),
      htmlData
    );

    browser = await getBrowser();
    if (!browser) {
      throw new Error("Browser is null");
    }

    const page = await browser.newPage();
    await page.setContent(htmlData, {
      waitUntil: "networkidle0",
    });
    await page.screenshot({
      path: path.resolve(os.tmpdir(), `codepens/${timestamp}.png`),
    });

    await browser.close();
    browser = null;

    const pinataHTMLUpload = await pinataClient.pinFromFS(
      path.resolve(os.tmpdir(), `codepens/${timestamp}.html`)
    );
    const pinataImageUpload = await pinataClient.pinFromFS(
      path.resolve(os.tmpdir(), `codepens/${timestamp}.png`)
    );

    const pinataMetaUpload = await pinataClient.pinJSONToIPFS({
      name: NFTName,
      description: `${NFTName} by ${userName}`,
      attributes: [
        {
          trait_type: "Created By",
          value: userName,
        },
      ],
      image: `ipfs://${pinataImageUpload.IpfsHash}`,
      animation_url: `ipfs://${pinataHTMLUpload.IpfsHash}`,
    });

    res.status(200).json({
      htmlURL: pinataHTMLUpload.IpfsHash,
      metaDataURL: pinataMetaUpload.IpfsHash,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

const getTimeStamp = () => Date.now();

export default handler;
