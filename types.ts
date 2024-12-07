export type MediaType = 'movie' | 'tv';

// Media and Related Types
export interface Media {
  id: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  title: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  media_type?: MediaType;
  runtime?: number;
  budget?: number;
  status?: string;
  genres?: Genre[];
  production_companies?: ProductionCompany[];
  videos?: VideoResult;
  images?: MediaImages;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  id: string;
}

export interface VideoResult {
  results: Video[];
}

export interface MediaImages {
  backdrops: Image[];
  posters: Image[];
}

export interface Image {
  height: number;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface CombinedCredits {
  cast?: Media[];
  crew?: Media[];
}

// Reviews
export interface Review {
  author: string;
  author_details: AuthorDetail;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface AuthorDetail {
  name: string;
  username: string;
  avatar_path: string;
  rating: string;
}

// Page Results
export interface PageResult<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// Options for Select Menus
export interface Options {
  name: string;
  value: string | number | boolean;
}

// Production Company
export interface ProductionCompany {
  id: number;
  name: string;
  logo_path?: string;
  origin_country: string;
}

// Search Keyword
export interface SearchKeyword {
  id: number;
  name: string;
}

// Query Item for Search
export interface QueryItem {
  type: MediaType;
  title: string;
  query: string;
}
