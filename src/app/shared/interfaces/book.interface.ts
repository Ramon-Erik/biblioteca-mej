export interface CatalogFilters {
  page: number;
  size: number;
  oculto: boolean;
  sort?: string;
  categoriaId?: string;
  disponivel?: boolean;
}
export interface Category {
  id: string;
  nome: string;
  descricao: string;
}
export interface RawBook {
  nomeObra: string;
  autor: string;
  editora: string;
  volume: number | null;
  descricao: string;
  categoriasIds: string[];
  quantidade: number;
  fotoCapaUrl: string;
}

export interface Book {
  id: string;
  nomeObra: string;
  autor: string;
  editora: string;
  volume: string | null;
  descricao: string;
  categorias: Category[];
  quantidade: number;
  fotoCapaUrl: string;
  oculto: false;
  motivoOcultacao: string | null;
  criadoPorId: string;
  editadoPorId: null;
  criadoEm: string;
  editadoEm: null;
}

export interface PageableConfig {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: SortConfig;
  unpaged: boolean;
}

export interface SortConfig {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface PageResponse<T> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: PageableConfig;
  size: number;
  sort: SortConfig;
  totalElements: number;
  totalPages: number;
}
