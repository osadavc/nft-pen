import axios from "axios";
import { useEffect, useRef, useState } from "react";
import nprogress from "nprogress";

const Dashboard = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [iframeContent, setIframeContent] = useState("");
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

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
    <div className="p-10">
      <input
        type="text"
        placeholder="Enter Codepen URL"
        className="w-[48rem] border p-5"
        ref={inputRef}
      />

      <button onClick={populateIframe}>Populate Iframe</button>

      {iframeContent && (
        <div className="mt-2 w-min border p-10">
          <iframe
            width={screenWidth > 600 ? 582 : screenWidth - 50}
            height={500}
            srcDoc={iframeContent}
            className="border"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
