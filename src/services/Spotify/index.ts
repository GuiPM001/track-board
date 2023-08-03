import axios from "axios";
import authService from "../Auth";

export async function fetchApi(endpoint: string, method: string, body?: any) {
  var accessToken = authService.getAccessToken();

  let response = await axios(`https://api.spotify.com/v1/${endpoint}`, {
    method: method,
    headers: { Authorization: `Bearer ${accessToken}`},
    data: JSON.stringify(body)
  });

  return response;
}