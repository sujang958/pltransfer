import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { authWithCode } from "$lib/auth/spotify"
import { HTTPError } from "ky"

export const load: PageServerLoad = async ({ params, url, cookies }) => {
	const MUSIC_PLATFORM = params.slug.toUpperCase()

	const code = url.searchParams.get("code")
	const state = url.searchParams.get("state")
	const originalState = cookies.get("state")

	// if (!code || !state||!originalState) return error(401, "Missing params")
	// if (state !== originalState) return error(401, "Some bad request")

	try {
		console.log("Hello?")
		switch (MUSIC_PLATFORM) {
			case "SPOTIFY":
				authWithCode(code as string)
				break
			default:
				error(404, "Unsupported service")
		}
	} catch (e) {
		console.log("asdfasf")
		if (e instanceof HTTPError) {
			console.log(e.message, e.name, e.cause)
			error(500, "Something went wrong")
		}
	}
}
