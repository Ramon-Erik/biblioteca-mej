import { ApiPageableConfig, ApiSortState } from '@shared/interfaces/user.interface';

export type LoanStatus = 'PENDENTE' | 'APROVADO' | 'RECUSADO' | 'DEVOLVIDO' | 'EM_ANDAMENTO';

export interface LoanItem {
  id: string;
  livroId: string;
  nomeObra: string;
  fotoCapaUrl: string;
  dataPedido: string;
  dataDevolucaoPrevista?: string;
  dataDevolucaoEfetiva?: string;
  status: LoanStatus;
}

/**
 * Resposta paginada padrão do Spring para as listas de empréstimos
 */
export interface LoanPageResponse {
  content: LoanItem[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: ApiPageableConfig;
  sort: ApiSortState;
  empty: boolean;
}

export interface ProfileFilters {
  page: number;
  size: number;
}
