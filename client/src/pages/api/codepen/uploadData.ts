import { NextApiHandler } from "next";
import { Browser } from "puppeteer";
import getBrowser from "../../../utils/getBrowser";
import { create } from "ipfs-http-client";

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

  const ipfs = create({
    url: "https://ipfs.infura.io:5001/api/v0",
  });
  let browser: Browser | null = null;

  try {
    browser = await getBrowser();
    if (!browser) {
      throw new Error("Browser is null");
    }

    const page = await browser.newPage();
    await page.setContent(htmlData, {
      waitUntil: "networkidle0",
    });
    const screenshot = await page.screenshot();
    await browser.close();
    browser = null;

    const ipfsHtmlUpload = await ipfs.add(Buffer.from(htmlData));
    const ipfsImageUpload = await ipfs.add(screenshot);

    const ipfsMetaUpload = await ipfs.add(
      Buffer.from(
        JSON.stringify({
          name: NFTName,
          description: `${NFTName} by ${userName}`,
          attributes: [
            {
              trait_type: "Created By",
              value: userName,
            },
          ],
          image: `ipfs://${ipfsImageUpload.path}`,
          animation_url: `ipfs://${ipfsHtmlUpload.path}`,
        })
      )
    );

    res.status(200).json({
      imageURL: ipfsImageUpload.path,
      metaDataURL: ipfsMetaUpload.path,
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

export default handler;
