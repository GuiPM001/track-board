import { fetchApi } from "..";
import { UserProfile } from "../../../interfaces/UserProfile";

async function getProfile(): Promise<UserProfile> {
  let response = await fetchApi('me', 'GET');

  return response.data;
}

const profileService = {
  getProfile
}

export default profileService;