import axios from 'axios';

const clientId: string = '4abfd39315f0438588b4f05e2bd84f54';
const redirectUri = 'https://track-board.vercel.app';

function checkAuth(): boolean {
  var authToken = localStorage.getItem('auth_token');

  if (authToken) {
    var token = JSON.parse(authToken);

    if (new Date().getTime() > token.expiry)
      return false;

    return true;
  }

  return false;
}

async function authUser(): Promise<void> {
  let rotaAtual = window.location.href;
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  if (code) {
    await fetchAccessToken(code);
    window.location.href = rotaAtual.substring(0, rotaAtual.indexOf('code') - 1);
  }
  else {
    await redirectToAuthCodeFlow();
  }
}

function getAccessToken() {
  var token = JSON.parse(localStorage.getItem('auth_token')!);
  return token.token;
}

async function redirectToAuthCodeFlow() {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", redirectUri);
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);
  params.append(
    "scope", `
    user-read-private 
    user-read-email 
    user-top-read 
    user-follow-read
    user-library-read
    user-read-recently-played
    playlist-read-private 
    playlist-read-collaborative 
    playlist-modify-public 
    playlist-modify-private
  `);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

async function fetchAccessToken(code: string) {
  const verifier = localStorage.getItem("verifier");

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirectUri);
  params.append("code_verifier", verifier!);

  var response = await axios('https://accounts.spotify.com/api/token', {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: params.toString()
  });

  let tokenExpiry = new Date();
  
  const auth_token = {
    token: response.data.access_token,
    expiry: tokenExpiry.setSeconds(tokenExpiry.getSeconds() + 3600)
  }

  localStorage.setItem('auth_token', JSON.stringify(auth_token));
}

function generateCodeVerifier(length: number) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
}

const authService = {
  checkAuth,
  authUser,
  getAccessToken
}

export default authService;