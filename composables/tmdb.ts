import type { Media, MediaType, PageResult, Review } from "~/types";

function _fetchTMDB(url: string, params: Record<string, string | number | undefined> = {}) {
    return $fetch(`/api/tmdb/${url}`, {
      params,
    });
  }
  
  export function fetchTMDB(url: string, params: Record<string, string | number | undefined> = {}): Promise<any> {
    return _fetchTMDB(url, params);
  }

  export function findListGenre(media: string): Promise<{ name: string; id: number }[]> {
    return fetchTMDB(`genre/${media}/list`).then(res => res.genres)
  }

  export function findSearchKeyword(query: string) {
    return fetchTMDB('search/multi', { query })
  }

  export function findListTrending(media: string, time_window: string = 'day'): Promise<any> {
    return fetchTMDB(`trending/${media}/${time_window}`, { language: 'id-ID' })
  }

  export function findDiscoverByType(type: MediaType, payload: any): Promise<PageResult<Media>> {
    return fetchTMDB(`discover/${type}`, payload)
  }

  export function findMediaById(type: MediaType, id: string): Promise<Media> {
    return fetchTMDB(`${type}/${id}`, {
      include_image_language: 'en',
    })
  }

  export function findListRecommendation(type: MediaType, id: string, page = 1): Promise<PageResult<Media>> {
    return fetchTMDB(`${type}/${id}/recommendations`, { page })
  }

  export function findReviewsById(type: MediaType, id: string, page = 1): Promise<PageResult<Review>> {
    return fetchTMDB(`${type}/${id}/reviews`, { page })
  }
  