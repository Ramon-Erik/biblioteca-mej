export interface Category {
  id: string;
  nome: string;
  descricao: string;
}
export interface RawBook {
  nomeObra: string;
  autor: string;
  editora: string;
  volume: string | null; // Note que a API pode mandar nulo
  descricao: string;
  categoriasIds: string[]; // Substitua por 'Categoria[]' caso tenha uma interface para categorias
  quantidade: number;
  fotoCapaUrl: string;
}

export interface Book {
  id: string;
  nomeObra: string;
  autor: string;
  editora: string;
  volume: string | null; // Note que a API pode mandar nulo
  descricao: string;
  categorias: Category[]; // Substitua por 'Categoria[]' caso tenha uma interface para categorias
  quantidade: number;
  fotoCapaUrl: string;
  oculto: false;
  motivoOcultacao: string | null;
  criadoPorId: '213b9541-76ca-4259-bc4a-43722108acee';
  editadoPorId: null;
  criadoEm: '2026-06-13T14:16:03.970142';
  editadoEm: null;
}

// 2. Interface auxiliar para o mapeamento interno de "pageable"
export interface PageableConfig {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: SortConfig;
  unpaged: boolean;
}

// 3. Interface auxiliar para ordenação "sort"
export interface SortConfig {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

// 4. Interface Genérica de Paginação. O '<T>' permite que você passe qualquer tipo para o content!
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
