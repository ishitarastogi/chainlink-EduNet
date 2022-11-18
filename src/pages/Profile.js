import React from "react";
import CreateProfile from "../components/profile/CreateProfile";

import { GET_PROFILES } from "../api/profile/get-profiles";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
function Profile() {
  const { data: accountData } = useAccount();
  const { data: profileData } = useQuery(GET_PROFILES, {
    variables: {
      request: { ownedBy: [accountData?.address] },
    },
  });
  if (!profileData) return null;

  const currentUser = profileData?.profiles?.items[0];
  console.log(accountData?.address);

  console.log(currentUser);
  return (
    <div>
      <CreateProfile />
    </div>
  );
}

export default Profile;
