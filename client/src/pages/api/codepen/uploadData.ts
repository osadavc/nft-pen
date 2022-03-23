import { NextApiHandler } from "next";
import fs from "fs";
import pinataClient from "../../../utils/pinataClient";
import { Browser } from "puppeteer-core";
import getBrowser from "../../../utils/getBrowser";

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
  let browser: Browser | null = null;

  try {
    await fs.promises.writeFile(
      `../../../../public/codepens/${timestamp}.html`,
      htmlData
    );

    browser = await getBrowser();
    if (!browser) {
      throw new Error("Browser is null");
    }

    const page = await browser.newPage();
    await page.setViewport({ height: 500, width: 500 });
    await page.setContent(htmlData, {
      waitUntil: "networkidle0",
    });
    await page.screenshot({
      path: `../../../../public/codepens/${timestamp}.png`,
    });

    await browser.close();
    browser = null;

    const pinataHTMLUpload = await pinataClient.pinFromFS(
      `../../../../public/codepens/${timestamp}.html`
    );
    const pinataImageUpload = await pinataClient.pinFromFS(
      `../../../../public/codepens/${timestamp}.png`
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

    await fs.promises.unlink(`../../../../public/codepens/${timestamp}.html`);
    await fs.promises.unlink(`../../../../public/codepens/${timestamp}.png`);

    res.status(200).json({
      imageURL: pinataHTMLUpload.IpfsHash,
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
