import { NextApiHandler } from "next";
import axios from "axios";
import * as cheerio from "cheerio";
import { isCodePenURL } from "../../../utils/validation";
import { scrollbarCss } from "../../../utils/scrollbarCss";

const handler: NextApiHandler = async (req, res) => {
  if (req.method != "POST") {
    return res.status(405).json({
      statusCode: 405,
      message: "Method not allowed",
    });
  }

  const { codepenURL } = req.body as {
    codepenURL: string;
  };

  const splittedUrl = codepenURL.split("/");

  const {
    [splittedUrl.length - 1]: codepenId,
    [splittedUrl.length - 3]: codepenUserName,
  } = splittedUrl;

  if (!isCodePenURL(codepenURL))
    return res.status(400).json({
      status: 400,
      message: "Invalid CodePen URL",
    });

  const pageURL = `https://cdpn.io/${codepenUserName}/fullpage/${codepenId}`;

  const { data } = await axios.get(pageURL);

  const codePenIframe = cheerio.load(data);
  const pageContent = codePenIframe("iframe").attr("srcdoc");

  const codePenIframeContent = cheerio.load(pageContent ?? "");
  const penTitle = codePenIframeContent("title").text().split(" - ")[1];

  res.status(200).json({
    data: `${pageContent} <style>${scrollbarCss}</style>`,
    penAuthor: codepenUserName,
    penId: codepenId,
    penTitle,
  });
};

export default handler;
