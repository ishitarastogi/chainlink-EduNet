import React from "react";
import SetDefault from "../components/profile/SetDefault";

import { GET_PROFILES } from "../api/profile/get-profiles";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
function SetDefaultProfile() {
  const { data: accountData } = useAccount();
  const { data: profileData } = useQuery(GET_PROFILES, {
    variables: {
      request: { ownedBy: [accountData?.address] },
    },
  });
  if (!profileData) return null;

  const currentUser = profileData.profiles.items[0];
  console.log(accountData?.address);

  console.log(currentUser.id);
  return (
    <div>
      {" "}
      <SetDefault currentUser={currentUser} />{" "}
    </div>
  );
}

export default SetDefaultProfile;
