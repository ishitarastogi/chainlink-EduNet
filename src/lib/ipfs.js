import { Web3Storage, File } from "web3.storage";
import { Buffer } from "buffer";
export const Ipfs = async ({ data }) => {
  console.log(data);
  try {
    const files = await makeFileObjects(data);
    const cid = await storeFiles(files);
   const x= await retrieve(cid);
   console.log(x);
    return cid;
  } catch (err) {
    console.error(err);
  }
};
async function makeFileObjects(data) {
  const buffer = Buffer.from(JSON.stringify(data));

  const files = [new File([buffer], "data.json")];
  console.log(files);
  return files;
}
async function storeFiles(files) {
  const client = makeStorageClient();
  const cid = await client.put(files);
  console.log(cid);
  return cid;
}
function makeStorageClient() {
  return new Web3Storage({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEUxOTU2QThjRTM2OTgwMTIwMjcyNDExY2IzMjI0MjM0MGM4MEY4RTciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjM4MzQxNDEzMzYsIm5hbWUiOiJEQU9DYXJlIn0.visBJeRZzZ6_mpPzveNwhZpylx-APya1jC0Xf5Jh92c",
  });
}
async function retrieve(cid) {
  const client = makeStorageClient();
  const res = await client.get(cid);
    console.log(`Got a response! [${res.status}] ${res.statusText}`);
    if (!res.ok) {
      throw new Error(`failed to get ${cid}`);
    }
  return res.statusText;


  // request succeeded! do something with the response object here...
}