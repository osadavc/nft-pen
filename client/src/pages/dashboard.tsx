import axios from "axios";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import nprogress from "nprogress";
import Header from "../components/Common/Header";
import BgGradients from "../components/Common/BgGradients";

const Dashboard = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [iframeContent, setIframeContent] = useState("");
  const [screenWidth, setScreenWidth] = useState(0);
  const [iframeWidth, setIframeWidth] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // FIXME: A problem with mobile layouts

  useLayoutEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    setIframeWidth(screenWidth > 600 ? 582 : screenWidth - 50);
  }, [screenWidth]);

  const onResize = () => {
    setScreenWidth(window.innerWidth);
  };

  const populateIframe = async () => {
    nprogress.start();

    try {
      const {
        data: { data },
      } = await axios.post("/api/codepen", {
        codepenURL: inputRef.current?.value,
      });

      setIframeContent(data);

      setTimeout(() => {
        nprogress.done();
      }, 500);
    } catch (error: any) {
      nprogress.done();
    }
  };

  return (
    <div className="flex flex-col items-center px-3 pt-8 capitalize">
      <Header />
      <BgGradients />

      <div
        style={{
          width: iframeWidth,
        }}
      >
        <div className="mt-6 h-[500px] rounded-md border border-zinc-300">
          <iframe
            width={iframeWidth}
            height={500}
            srcDoc={iframeContent}
          ></iframe>
        </div>

        <div className="mt-4 flex h-12 space-x-2">
          <input
            type="text"
            className="grow rounded-md border border-zinc-300 px-4 font-bold"
            placeholder="Type Your CodePen Link Here"
            ref={inputRef}
          />
          <button
            className="rounded-md border border-zinc-300 px-4 text-lg font-bold"
            onClick={populateIframe}
          >
            Fetch
          </button>
        </div>

        {iframeContent && (
          <div className="mt-5 space-y-2">
            <p className="text-center text-sm font-medium">
              Above Is An Exact Preview About How Your NFT Would Look Like In
              NFT Marketplaces. Don't Proceed Anymore If The Preview Doesn't
              look good. Otherwise your NFT will look like 💩
            </p>
            <button className="h-11 w-full rounded-md border border-zinc-300 font-bold">
              Mint NFT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
