import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { authWithCode } from "$lib/auth/spotify"

export const load: PageServerLoad = async ({ params, url, cookies }) => {
	const MUSIC_PLATFORM = params.slug.toUpperCase()

	// const code = url.searchParams.get("code")
	// const state = url.searchParams.get("state")
	// const originalState = cookies.get("state")

	// if (!code || !originalState) return error(401, "Missing params")
	// if (state !== originalState) return error(401, "Some bad request")

	switch (MUSIC_PLATFORM) {
		case "SPOTIFY":
			authWithCode("sadfasdfadsfas")
			break
		default:
			error(404, "Unsupported service")
	}
}
