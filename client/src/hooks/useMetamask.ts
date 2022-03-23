import { useEffect, useState } from "react";
import { WalletError } from "../types/walletError";

const useMetamask = () => {
  const [walletError, setWalletError] = useState<WalletError>("loading");

  useEffect(() => {
    (async () => {
      if (!window.ethereum) {
        setWalletError("no_wallet");
      } else {
        try {
          const accounts = (await window.ethereum.request({
            method: "eth_requestAccounts",
          })) as string[];

          if (parseInt(window.ethereum.chainId ?? "") != 80001) {
            setWalletError("wrong_network");
          }

          window.ethereum.on("chainChanged", (_chainId) => {
            if (parseInt(_chainId as string) != 80001) {
              setWalletError("wrong_network");
            }
          });

          if (accounts?.length > 0) {
            setWalletError(null);
          }
        } catch (error) {
          setWalletError("no_wallet");
        }
      }
    })();
  }, []);

  return { walletError, setWalletError };
};

export default useMetamask;
