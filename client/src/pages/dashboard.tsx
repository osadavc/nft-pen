import axios from "axios";
import { useEffect, useRef, useState } from "react";
import nprogress from "nprogress";
import Header from "../components/Common/Header";
import BgGradients from "../components/Common/BgGradients";
import * as env from "../config";
import toast from "react-hot-toast";

import { ethers } from "ethers";
import CodePenNFT from "../utils/CodePenNFT.json";
import Modal from "../components/Common/Modal";
import MintModal from "../components/Dashboard/MintModal";
import useMetamask from "../hooks/useMetamask";
import WalletInfoModal from "../components/Dashboard/WalletInfoModal";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { IFrameContent } from "types/iframeContent";

import { useLazyQuery, useMutation } from "@apollo/client";

import addNewCodePenMutation from "graphql/codepens/mutations/addNewCodePen.gql";
import getMatchingCodePensQuery from "graphql/codepens/queries/getMatchingCodePens.gql";

import {
  AddNewCodePenMutation,
  AddNewCodePenMutationVariables,
} from "graphql/codepens/mutations/addNewCodePen.generated";
import {
  GetMatchingCodePensQuery,
  GetMatchingCodePensQueryVariables,
} from "graphql/codepens/queries/getMatchingCodePens.generated";

const Dashboard = () => {
  const codePenURLInput = useRef<HTMLInputElement>(null);

  const contractRef = useRef<ethers.Contract | null>(null);
  const signerRef = useRef<ethers.Signer | null>(null);

  const [iframeContent, setIframeContent] = useState<IFrameContent>({
    data: "",
    htmlURL: "",
    penAuthor: "",
    penId: "",
    penTitle: "",
  });
  const [screenWidth, setScreenWidth] = useState(0);
  const [iframeWidth, setIframeWidth] = useState(0);
  const [isNFTModalOpen, setIsNFTModalOpen] = useState(false);

  const { walletError, setWalletError, switchToPolygon } = useMetamask();

  const [addNewCodePen] = useMutation<
    AddNewCodePenMutation,
    AddNewCodePenMutationVariables
  >(addNewCodePenMutation);
  const [getMatchingCodepens] = useLazyQuery<
    GetMatchingCodePensQuery,
    GetMatchingCodePensQueryVariables
  >(getMatchingCodePensQuery);

  useEffect(() => {
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // FIXME: A problem with mobile layouts

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    signerRef.current = provider.getSigner();
    contractRef.current = new ethers.Contract(
      env.contractAddress,
      CodePenNFT.abi,
      signerRef.current
    );
  }, []);

  useEffect(() => {
    setIframeWidth(screenWidth > 510 ? 500 : screenWidth - 50);
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
        data: { data, penAuthor, penId, penTitle },
      } = await axios.post("/api/codepen", {
        codepenURL: codePenURLInput.current?.value,
      });

      setIframeContent({ data, penAuthor, penId, penTitle });

      setTimeout(() => {
        nprogress.done();
      }, 500);
    } catch (error: any) {
      nprogress.done();
    }
  };

  const mintNFT = async () => {
    try {
      if (!iframeContent.penTitle.trim() || !iframeContent.data) {
        return;
      }

      nprogress.start();

      const { data } = await getMatchingCodepens({
        variables: {
          penAuthor: iframeContent.penAuthor,
          penTitle: iframeContent.penTitle,
          penId: iframeContent.penId,
        },
      });

      if (data?.users[0].codepens.length! > 0) {
        toast.error("This pen has already been minted");
        setIsNFTModalOpen(false);

        setTimeout(() => {
          return window.open(
            `https://testnets.opensea.io/assets/mumbai/0x04d4cc7fae00065ebfd2422c064fa9615b18ec13/${data?.users[0].codepens[0].nftId}`
          );
        }, 1000);
      }

      const {
        data: { htmlURL, metaDataURL },
      } = await axios.post("/api/codepen/uploadData", {
        htmlData: iframeContent.data,
        userName: iframeContent.penAuthor,
        penId: iframeContent.penId,
        NFTName: iframeContent.penTitle,
      });

      nprogress.inc();

      setIframeContent((prevData) => ({
        ...prevData,
        htmlURL,
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
      const nftId = await contractRef.current?.nftCount();

      await result.wait();
      nprogress.inc();

      await addNewCodePen({
        variables: {
          nftId: parseInt(nftId),
          penAuthor: iframeContent.penAuthor,
          penId: iframeContent.penId,
          penTitle: iframeContent.penTitle,
        },
      });
    } catch (error: any) {
      console.log(error.message);
    } finally {
      nprogress.done();
    }
  };

  return (
    <div className="flex flex-col items-center px-3 pt-8 capitalize">
      <Header />
      <BgGradients />

      <Modal isOpen={isNFTModalOpen} setIsOpen={setIsNFTModalOpen}>
        <MintModal
          mintNFT={mintNFT}
          iframeContent={iframeContent}
          setIframeContent={setIframeContent}
        />
      </Modal>

      <Modal
        isOpen={!!walletError}
        setIsOpen={setWalletError as any}
        customFalse={null}
        unClosable
      >
        <div className="z-[2000] flex flex-col items-center justify-center">
          <WalletInfoModal
            walletError={walletError}
            switchToPolygon={switchToPolygon}
          />
        </div>
      </Modal>

      <div
        style={{
          width: iframeWidth,
        }}
        className="z-50"
      >
        <div className="mt-6 h-[500px] rounded-md border border-zinc-300">
          {iframeContent.data ? (
            <iframe
              width={iframeWidth}
              height={500}
              srcDoc={iframeContent.data}
            ></iframe>
          ) : (
            <div className="flex h-full items-center justify-center">
              <h3 className="w-[75%] text-center text-xs font-semibold text-gray-500">
                No Pen Fetched, Fetch Your CodePen Details With The Input Below
              </h3>
            </div>
          )}
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

        {iframeContent.data && (
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default Dashboard;
