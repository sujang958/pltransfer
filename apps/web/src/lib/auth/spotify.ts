import {
	SPOTIFY_CLIENT_ID,
	SPOTIFY_REDIRECT_URI,
	SPOTIFY_SECRET,
} from "$env/static/private"
import ky from "ky"
import { btoa } from "node:buffer"
import { randomUUID } from "node:crypto"
import qs from "node:querystring"

export const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/api/token"
export const BASE_AUTH_URL = `https://accounts.spotify.com/authorize?${qs.stringify(
	{
		client_id: SPOTIFY_CLIENT_ID,
		redirect_uri: SPOTIFY_REDIRECT_URI,
		scope: "playlist-read-private playlist-read-collaborative",
		response_type: "code",
	},
)}`

console.log(BASE_AUTH_URL)

export const getAuthURL = (_state?: string) => {
	const state = _state ?? randomUUID().slice(-12)
	return { url: `${BASE_AUTH_URL}&state=${state}`, state }
}

export const authWithCode = async (code: string) => {
	const res = await ky
		.post(SPOTIFY_AUTH_URL, {
			body: qs.stringify({
				code,
				redirect_uri: SPOTIFY_REDIRECT_URI,
				grant_type: "authorization_code",
			}),
			headers: {
				Authorization: `Basic ${btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_SECRET}`)}`,
				"Content-Type": "application/x-www-form-urlencoded",
			},
		})
		.json()

	console.log(res)
}

/*      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    }; */
