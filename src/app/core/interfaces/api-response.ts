/**
 * Interfaz base genérica para las respuestas de la API de Animecraft.
 * @template T Tipo de los datos contenidos en `data`.
 */
export interface ApiResponse<T> {
  success: boolean;
  pageInfo?: PageInfo;
  data: T;
  error?: string;
  message?: string;
}

/**
 * Metadatos de paginación devueltos por los endpoints de AniList/Animecraft.
 */
export interface PageInfo {
  total: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  perPage: number;
}

export interface PaginationParams {
  page?: number;
  perPage?: number;
}

/**
 * Parámetros de búsqueda y filtros para peticiones de anime.
 */
export interface AnimeQueryParams extends PaginationParams {
  q?: string;
  genre?: string;
  format?: string;
  range?: 'week' | 'month';
  count?: number;
  [key: string]: string | number | boolean | undefined;
}
