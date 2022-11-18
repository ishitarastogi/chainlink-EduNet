import React from "react";
import { GET_PROFILES } from "../api/profile/get-profiles";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import { Redirect } from "react-router-dom";
import Post from "../components/post/Post";
function Upload() {
  const { data: accountData } = useAccount();
  const { data: profileData } = useQuery(GET_PROFILES, {
    variables: {
      request: { ownedBy: [accountData?.address] },
    },
  });

  if (!profileData) return null;
  const currentUser = profileData.profiles.items[0];

  if (!currentUser) return <div>{<Redirect to="createProfile/" />}</div>;
  return (
    <div>
      <Post currentUser={currentUser} />
    </div>
  );
}

export default Upload;
