import type { MediaType } from "~/types"

export function getTitle(type: MediaType) {
    switch (type) {
      case 'movie': return 'Movies'
      case 'tv': return 'TV Shows'
      default : return 'Movies'
    }
  }

  export const usdFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })