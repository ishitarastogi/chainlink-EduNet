import { useCreateAsset } from "@livepeer/react";
import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST_TYPED_DATA } from "../../api/post/create-post";
import { omit, splitSignature } from "../../lib/apollo/helpers";
import { useSignTypedData, useContractWrite, useAccount } from "wagmi";
import { LENS_HUB_PROXY_ADDRESS } from "../../config";
import { Ipfs } from "../../lib/ipfs";
import LENS_ABI from "../../abis/Lens-Hub.json";
import { create } from "ipfs-http-client";
import { DEFAULT_TOKEN } from "../../config";
import { Player } from "@livepeer/react";
import { v4 as uuidv4 } from "uuid";

import "./Post.css";

function Post({ currentUser }) {
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [animationURL, setAnimationURL] = useState("");
  const [url, setUrl] = useState("");
  const [amount, setAmount] = useState(0);
  const [recepient, setRecipient] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const { signTypedDataAsync } = useSignTypedData();

  const [video, setVideo] = useState();
  const {
    mutate: createAsset,
    data: assets,
    status,
    progress,
    error,
  } = useCreateAsset(
    // we use a `const` assertion here to provide better Typescript types
    // for the returned data
    video
      ? {
          sources: [{ name: video.name, file: video }],
        }
      : null
  );
  useEffect(() => {
    assets?.map((asset) => setUrl(asset?.downloadUrl));
  }, []);
  console.log("url", url, "asset", assets);
  const { writeAsync } = useContractWrite(
    {
      addressOrName: LENS_HUB_PROXY_ADDRESS,
      contractInterface: LENS_ABI,
    },
    "postWithSig"
  );
  const [createPostTypedData, {}] = useMutation(CREATE_POST_TYPED_DATA, {
    onCompleted({ createPostTypedData }) {
      if (!createPostTypedData) console.log("createPost is null");
      const { typedData } = createPostTypedData;
      const {
        profileId,
        contentURI,
        collectModule,
        collectModuleInitData,
        referenceModule,
        referenceModuleInitData,
      } = typedData?.value;

      signTypedDataAsync({
        domain: omit(typedData?.domain, "__typename"),
        types: omit(typedData?.types, "__typename"),
        value: omit(typedData?.value, "__typename"),
      }).then((res) => {
        const { v, r, s } = splitSignature(res);
        const postARGS = {
          profileId,
          contentURI,
          collectModule,
          collectModuleInitData,
          referenceModule,
          referenceModuleInitData,
          sig: {
            v,
            r,
            s,
            deadline: typedData.value.deadline,
          },
        };
        writeAsync({ args: postARGS }).then((res) => {
          res.wait(1).then(() => {
            setIsPosting(false);
            setContent("");
          });
        });
      });
    },
    onError(error) {
      console.log(error);
      setIsPosting(false);
    },
  });
  console.log(currentUser.id);
  const handlePost = async () => {
    if (!currentUser) return;
    setIsPosting(true);

    const data = {
      version: "1.0.0",
      metadata_id: uuidv4(),
      description,
      content,
      locale: "en-US",
      tags: ["nft1"],
      mainContentFocus: "TEXT_ONLY",
      name,
      image: "https://scx2.b-cdn.net/gfx/news/hires/2018/lion.jpg",
      imageMimeType: "image/jpeg",
      attributes: [
        {
          traitType: "location",
          value: "India",
          displayType: "string",
        },
      ],
      media: [
        {
          item: url,
          type: "video/mp4",
        },
      ],
      appId: "edunet",
    };
    console.log(data);
    const result = await Ipfs({ data });
    console.log("https://" + result + ".ipfs.w3s.link/abc.json");
    createPostTypedData({
      variables: {
        request: {
          profileId: currentUser.id,
          contentURI: "https://" + result + ".ipfs.w3s.link/data.json",
          collectModule: amount
            ? {
                limitedFeeCollectModule: {
                  collectLimit: "100000",
                  amount: {
                    currency: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
                    value: amount,
                  },
                  recipient: recepient,
                  referralFee: 0,
                },
              }
            : { freeCollectModule: { followerOnly: true } },
          referenceModule: {
            followerOnlyReferenceModule: false,
          },
        },
      },
    });
  };
  if (isPosting) {
    return <div>Posting...</div>;
  }
  return (
    <div>
      {" "}
      <input
        type="file"
        multiple={false}
        accept="video/*"
        onChange={(e) => {
          if (e.target.files) {
            setVideo(e.target.files[0]);
          }
        }}
      />
      <button
        disabled={status === "loading" || !createAsset}
        onClick={() => {
          createAsset?.();
        }}
      >
        Create Asset
      </button>
      <div className="bold-lines"></div>
      <div className="containers">
        <div className="windows">
          <div className="overlays"></div>
          <div className="contents">
            <div className="welcomes">Hello There!</div>
            <div className="subtitles"></div>
            <form onSubmit={handlePost}>
              <div className="input-fieldss">
                <input
                  className="input-line full-widths"
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Project Name"
                ></input>{" "}
                <br />
                <br />
                <input
                  className="input-line full-widths"
                  id="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter Project Link"
                ></input>{" "}
                <br />
                <br />
                <label>
                  Select Image <br />
                  <br />
                </label>
                <input
                  className="input-line full-widths"
                  id="external"
                  type="url"
                  value={animationURL}
                  onChange={(e) => setAnimationURL(e.target.value)}
                  placeholder="Enter animation url"
                ></input>{" "}
                <br />
                <br />
                <label>Please provide project description</label> <br />
                <br />
                <textarea
                  style={{ width: "100%", height: "100px" }}
                  id="content"
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Content"
                ></textarea>
                <label></label>
                <input
                  className="input-line full-widths"
                  id="external"
                  type="url"
                  value={externalUrl}
                  onChange={(e) => setExternalUrl(e.target.value)}
                  placeholder="Enter external url"
                ></input>
                <div className="collect">
                  <h2 style={{ display: "block" }}>
                    Collect Module (Optional)
                  </h2>{" "}
                  <p> </p>
                  <input
                    className="input-line full-widths"
                    id="external"
                    type="text"
                    value={DEFAULT_TOKEN}
                  ></input>
                  <input
                    className="input-line full-widths"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter Amount"
                  ></input>
                </div>
                <input
                  className="input-line full-widths"
                  type="text"
                  value={recepient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Enter Recepient Name"
                ></input>
                <button className="sub">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
