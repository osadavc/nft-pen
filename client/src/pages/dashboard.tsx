import axios from "axios";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import nprogress from "nprogress";
import Header from "../components/Common/Header";
import BgGradients from "../components/Common/BgGradients";
import * as env from "../config";

import { ethers } from "ethers";
import CodePenNFT from "../utils/CodePenNFT.json";
import Modal from "../components/Common/Modal";
import MintModal from "../components/Dashboard/MintModal";

const Dashboard = () => {
  const codePenURLInput = useRef<HTMLInputElement>(null);
  const NFTNameInput = useRef<HTMLInputElement>(null);

  const contractRef = useRef<ethers.Contract | null>(null);
  const signerRef = useRef<ethers.Signer | null>(null);

  const [iframeContent, setIframeContent] = useState<{
    data: string;
    imageURL?: string;
    metaDataURL?: string;
    penAuthor: string;
    penId: string;
  }>({ data: "", imageURL: "", penAuthor: "", penId: "" });
  const [screenWidth, setScreenWidth] = useState(0);
  const [iframeWidth, setIframeWidth] = useState(0);

  const [isNFTModalOpen, setIsNFTModalOpen] = useState(false);

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
    // TODO: Add a proper way to display this
    if (!window.ethereum) {
      alert("Please install MetaMask to use this app");
    } else {
      window.ethereum.request({ method: "eth_requestAccounts" });
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    signerRef.current = provider.getSigner();
    contractRef.current = new ethers.Contract(
      env.contractAddress,
      CodePenNFT.abi,
      signerRef.current
    );

    (async () => {
      const count = await contractRef.current?.nftCount();
      console.log(parseInt(count));
    })();
  }, []);

  useEffect(() => {
    setIframeWidth(screenWidth > 600 ? 582 : screenWidth - 50);
  }, [screenWidth]);

  const onResize = () => {
    setScreenWidth(window.innerWidth);
  };

  const populateIframe = async () => {
    if (!codePenURLInput.current?.value.trim()) {
      return;
    }

    nprogress.start();

    try {
      const {
        data: { data, penAuthor, penId },
      } = await axios.post("/api/codepen", {
        codepenURL: codePenURLInput.current?.value,
      });

      setIframeContent({ data, penAuthor, penId });

      setTimeout(() => {
        nprogress.done();
      }, 500);
    } catch (error: any) {
      nprogress.done();
    }
  };

  const mintNFT = async () => {
    if (!NFTNameInput.current?.value.trim() || !iframeContent.data) {
      return;
    }

    const {
      data: { imageURL, metaDataURL },
    } = await axios.post("/api/codepen/uploadData", {
      htmlData: iframeContent.data,
      userName: iframeContent.penAuthor,
      penId: iframeContent.penId,
      NFTName: NFTNameInput.current?.value,
    });

    setIframeContent((prevData) => ({
      ...prevData,
      imageURL,
      metaDataURL,
    }));

    const connection = contractRef.current?.connect(signerRef.current!);
    const result = await contractRef.current?.payToMint(
      connection?.address,
      metaDataURL,
      {
        value: ethers.utils.parseEther("0.0005"),
      }
    );

    await result.wait();
    console.log(result);

    const count = await contractRef.current?.nftCount();
    console.log(parseInt(count));
  };

  return (
    <div className="flex flex-col items-center px-3 pt-8 capitalize">
      <Header />
      <BgGradients />

      <Modal isOpen={isNFTModalOpen} setIsOpen={setIsNFTModalOpen}>
        <MintModal mintNFT={mintNFT} NFTNameInputRef={NFTNameInput} />
      </Modal>

      <div
        style={{
          width: iframeWidth,
        }}
        className="z-50"
      >
        <div className="mt-6 h-[500px] rounded-md border border-zinc-300">
          <iframe
            width={iframeWidth}
            height={500}
            srcDoc={iframeContent.data}
          ></iframe>
        </div>

        <div className="mt-4 flex h-12 space-x-2">
          <input
            type="text"
            className="grow rounded-md border border-zinc-300 bg-transparent px-4 font-bold"
            placeholder="Type Your CodePen Link Here"
            ref={codePenURLInput}
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
            <button
              className="h-11 w-full rounded-md border border-zinc-300 font-bold"
              onClick={() => {
                setIsNFTModalOpen(true);
              }}
            >
              Mint NFT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
