import { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI } from "$env/static/private"
import { randomUUIDv7 } from "bun"
import qs from "node:querystring"

export const BASE_AUTH_URL = `https://accounts.spotify.com/authorize?${qs.stringify(
	{
		client_id: SPOTIFY_CLIENT_ID,
		redirect_Uri: SPOTIFY_REDIRECT_URI,
		scope: "playlist-read-private playlist-read-collaborative",
		response_type: "code",
	},
)}`

export const getAuthURL = (_state?: string) => {
	const state = _state ?? randomUUIDv7().slice(-12)
	return { url: `${BASE_AUTH_URL}&state=${state}`, state }
}
