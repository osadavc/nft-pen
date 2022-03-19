import { NextApiHandler } from "next";
import axios from "axios";
import * as cheerio from "cheerio";
import { isCodePenURL } from "../../../utils/validation";
import { scrollbarCss } from "../../../utils/scrollbarCss";

const handler: NextApiHandler = async (req, res) => {
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
  const $ = cheerio.load(data);

  const pageContent = $("iframe").attr("srcdoc");

  res.send({ data: `${pageContent} <style>${scrollbarCss}</style>` });
};

export default handler;
