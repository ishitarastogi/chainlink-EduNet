import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_DEFAULT_PROFILE } from "../../api/profile/set-default-profile";
import { DEFAULT_TOKEN, LENS_HUB_PROXY_ADDRESS } from "../../config";
import { omit, splitSignature } from "../../lib/apollo/helpers";
import { useSignTypedData, useContractWrite, useAccount } from "wagmi";
import LENS_ABI from "../../abis/Lens-Hub.json";

function SetDefault({ currentUser }) {
  const { signTypedDataAsync } = useSignTypedData();

  const { writeAsync } = useContractWrite(
    {
      addressOrName: LENS_HUB_PROXY_ADDRESS,
      contractInterface: LENS_ABI,
    },
    "setDefaultProfileWithSig"
  );
  const [createSetDefaultProfileTypedData, {}] = useMutation(
    CREATE_DEFAULT_PROFILE,
    {
      onCompleted({ createSetDefaultProfileTypedData }) {
        if (!createSetDefaultProfileTypedData)
          console.log("createPost is null");
        console.log("aaa", createSetDefaultProfileTypedData.typedData);

        const { typedData } = createSetDefaultProfileTypedData;
        const { profileId, wallet } = typedData?.value;
        signTypedDataAsync({
          domain: omit(typedData?.domain, "__typename"),
          types: omit(typedData?.types, "__typename"),
          value: omit(typedData?.value, "__typename"),
        }).then((res) => {
          const { v, r, s } = splitSignature(res);
          const postARGS = {
            profileId,
            wallet,
            sig: {
              v,
              r,
              s,
              deadline: typedData.value.deadline,
            },
          };
          writeAsync({ args: postARGS }).then((res) => {
            res.wait(1).then(() => {});
          });
        });
      },
      onError(error) {
        console.log(error);
      },
    }
  );

  const handleDefaultProfile = async () => {
    await createSetDefaultProfileTypedData({
      variables: {
        request: {
          profileId: currentUser.id,
        },
      },
    });
  };
  return (
    <div>
      <button onClick={handleDefaultProfile}>Set as default Profile</button>
    </div>
  );
}

export default SetDefault;
