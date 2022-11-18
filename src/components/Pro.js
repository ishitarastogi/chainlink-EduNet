import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "../api/profile/get-profile";
function CreateProfile() {
  const { loading, error, data } = useQuery(GET_PROFILE);
  console.log(data?.profile?.attributes[0]?.value);

  if (loading)
    return (
      <div>
        <div>Submitting...</div>
      </div>
    );
  if (error) return <div>Submission error! {error.message}</div>;

  return <div></div>;
}

export default CreateProfile;
