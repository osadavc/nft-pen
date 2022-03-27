import { useEffect, useState } from "react";
import { WalletError } from "../types/walletError";

const useMetamask = () => {
  const [walletError, setWalletError] = useState<WalletError>("loading");

  useEffect(() => {
    (async () => {
      if (!window.ethereum) {
        setWalletError("no_wallet");
        return;
      } else {
        try {
          const accounts = (await window.ethereum.request({
            method: "eth_requestAccounts",
          })) as string[];

          if (parseInt(window.ethereum.chainId ?? "") != 80001) {
            setWalletError("wrong_network");
            return;
          }

          if (accounts?.length > 0) {
            setWalletError(null);
            return;
          }
        } catch (error) {
          setWalletError("not_connected");
          return;
        }
      }
    })();
  }, []);

  useEffect(() => {
    window.ethereum.on("chainChanged", (_chainId) => {
      if (parseInt(_chainId as string) != 80001) {
        setWalletError("wrong_network");
      } else {
        setWalletError(null);
      }
    });
  }, []);

  const switchToPolygon = () => {
    return window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x13881" }],
    });
  };

  return { walletError, setWalletError, switchToPolygon };
};

export default useMetamask;
