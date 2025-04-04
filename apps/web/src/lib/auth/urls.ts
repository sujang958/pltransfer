import {
	PUBLIC_SPOTIFY_CLIENT_ID,
	PUBLIC_SPOTIFY_REDIRECT_URI,
} from "$env/static/public"
import { nanoid, random } from "nanoid"
import qs from "query-string"

export const SPOTIFY_BASE_AUTH_URL = `https://accounts.spotify.com/authorize?${qs.stringify(
	{
		client_id: PUBLIC_SPOTIFY_CLIENT_ID,
		redirect_uri: PUBLIC_SPOTIFY_REDIRECT_URI,
		scope: "playlist-read-private playlist-read-collaborative",
		response_type: "code",
	},
)}`

export const getSpotifyAuthURL = (_state?: string) => {
	const state = _state ?? nanoid(10)
	return { url: `${SPOTIFY_BASE_AUTH_URL}&state=${state}`, state }
}
