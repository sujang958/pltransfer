import { SPOTIFY_SECRET } from "$env/static/private"
import {
	PUBLIC_SPOTIFY_CLIENT_ID,
	PUBLIC_SPOTIFY_REDIRECT_URI,
} from "$env/static/public"
import ky, { HTTPError } from "ky"
import { btoa } from "node:buffer"
import qs from "node:querystring"

export const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/api/token"

export const authWithCode = async (code: string) => {
	try {
		const res = await ky
			.post(SPOTIFY_AUTH_URL, {
				body: qs.stringify({
					code,
					redirect_uri: PUBLIC_SPOTIFY_REDIRECT_URI,
					grant_type: "authorization_code",
				}),
				headers: {
					Authorization: `Basic ${btoa(`${PUBLIC_SPOTIFY_CLIENT_ID}:${SPOTIFY_SECRET}`)}`,
					"Content-Type": "application/x-www-form-urlencoded",
				},
			})
			.json()

		console.log(res)
	} catch (e) {
		if (e instanceof HTTPError) {
			console.log(e.message, e.name, await e.response.json())
		}
	}
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
