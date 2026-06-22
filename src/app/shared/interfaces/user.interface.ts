export type UserRole = 'LEITOR' | 'ADMIN';

export interface User {
  id: string;
  nomeCompleto: string;
  email: string;
  telefoneWhatsapp: string;
  role: UserRole;
  ativo: boolean;
  loginBloqueado: boolean;
  motivoBloqueio: string;
  emailValidado: boolean;
  criadoEm: string;
}

export interface ApiSortState {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface ApiPageableConfig {
  offset: number;
  sort: ApiSortState;
  paged: boolean;
  pageSize: number;
  pageNumber: number;
  unpaged: boolean;
}

export interface UserPageResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: User[];
  number: number;
  sort: ApiSortState;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: ApiPageableConfig;
  empty: boolean;
}
