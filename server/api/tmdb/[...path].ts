import { $fetch } from 'ofetch'
import { getQuery } from 'ufo'

const TMDB_API_URL = 'https://api.themoviedb.org/3'

export default defineEventHandler(async (event) => {
  const query = getQuery(event.req.url!)
  const config = useRuntimeConfig()

  if (!config.tmdb.apiKey) throw new Error("TMDB Api key not set!")

  try {
    return await $fetch(event.context.params!.path, {
      baseURL: TMDB_API_URL,
      params: { api_key: config.tmdb.apiKey, language: 'en-US', ...query },
      headers: { Accept: 'application/json' },
    })
  } catch (error: any) {
    return error?.message?.replace(config?.tmdb?.apiKey, '***')
  }
})
