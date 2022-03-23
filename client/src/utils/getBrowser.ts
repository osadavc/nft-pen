import chromium from "chrome-aws-lambda";

const getBrowser = async () => {
  const executablePath = await chromium.executablePath;

  if (!executablePath) {
    const puppeteer = require("puppeteer");

    return puppeteer.launch({
      args: chromium.args,
      headless: false,
      defaultViewport: {
        width: 1280,
        height: 720,
      },
      ignoreHTTPSErrors: true,
    });
  }

  return chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: {
      width: 1280,
      height: 720,
    },
    executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
};

export default getBrowser;
