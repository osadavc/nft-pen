import puppeteer from "puppeteer";

const getBrowser = async () => {
  return puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
    defaultViewport: {
      height: 500,
      width: 500,
    },
  });
};

export default getBrowser;
