import axios from "axios";
import crypto from "crypto";

const baseUrl = "https://gateway.marvel.com/v1/public/";
const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY;
const privateKey = process.env.MARVEL_PRIVATE_KEY;

let lastRequestTime = 0;
export const shouldMakeRequest = () => {
  const now = Date.now();
  if (now - lastRequestTime > 1000) {
    lastRequestTime = now;
    return true;
  }
  return false;
};

export const createMarvelApiUrl = (
  exposed: boolean = true,
  path: string,
  nameStartsWith?: string,
  limit?: number,
  offset?: number
) => {
  let url = `${baseUrl}${path}?apikey=${publicKey}`;
  if (!exposed) {
    const timestamp = new Date().getTime();
    const hash = crypto
      .createHash("md5")
      .update(`${timestamp}${privateKey}${publicKey}`)
      .digest("hex");
    url += `&ts=${timestamp}&hash=${hash}`;
  }
  if (nameStartsWith) url += `&nameStartsWith=${nameStartsWith}`;
  if (limit) url += `&limit=${limit}`;
  if (offset) url += `&offset=${offset}`;

  return url;
};

export const fetchList = async (
  exposed: boolean = true,
  path: string,
  nameStartsWith?: string,
  limit?: number,
  offset?: number
) => {
  if (!shouldMakeRequest()) {
    return null;
  }

  const url = createMarvelApiUrl(exposed, path, nameStartsWith, limit, offset);
  const response = await axios.get(url);
  return response.data;
};

export const fetchCharacterById = async (
  exposed: boolean = true,

  characterId: string
) => {
  const url = createMarvelApiUrl(exposed, `characters/${characterId}`);
  const response = await axios.get(url);
  return response.data;
};
