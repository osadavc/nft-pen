import { Dialog } from "@headlessui/react";
import getCodePensByMeQuery from "graphql/codepens/queries/getCodePensByMe.gql";

import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import {
  GetCodePensByMeQuery,
  GetCodePensByMeQueryVariables,
} from "graphql/codepens/queries/getCodePensByMe.generated";
import Spinner from "components/Common/Spinner";

import * as env from "config";

const MintedPensModal = () => {
  const { data: session } = useSession();
  const { data, loading } = useQuery<
    GetCodePensByMeQuery,
    GetCodePensByMeQueryVariables
  >(getCodePensByMeQuery, {
    variables: {
      userId: session?.id as string,
    },
  });

  return (
    <div className="z-[2000] flex flex-col items-center justify-center">
      <Dialog.Title as="h2" className="text-xl font-semibold">
        Minted Code Pens
      </Dialog.Title>
      <Dialog.Description className="mt-2 text-center capitalize">
        See all of your minted code pens here
      </Dialog.Description>

      {loading && (
        <div className="mt-4">
          <Spinner width={35} height={35} />
        </div>
      )}

      {data?.codepens.length == 0 && (
        <div className="mt-4 text-sm font-semibold text-gray-400">
          <p>No Codepens Has Been Created</p>
        </div>
      )}

      <div className="mt-3 w-full space-y-2">
        {data?.codepens.map(({ penAuthor, penTitle, nftId, id }) => (
          <div className="w-full rounded bg-zinc-50 py-3 px-5" key={id}>
            <h1>
              {penTitle} by {penAuthor}
            </h1>
            <button
              className="mt-1 rounded border border-gray-300 py-1 px-3 text-sm transition-colors hover:bg-zinc-100"
              onClick={() => {
                window.open(
                  `https://testnets.opensea.io/assets/mumbai/${env.contractAddress}/${nftId}`
                );
              }}
            >
              View NFT
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MintedPensModal;
