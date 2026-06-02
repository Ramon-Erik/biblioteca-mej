export interface IBook {
  nomeObra: string;
  autor: string;
  editora: string;
  volume: string;
  descricao: string;
  categorias: string;
  quantidade: 0;
  fotoCapaUrl: string;
}

export interface IBookResponse {
  id: string;
  nomeObra: string;
  autor: string;
  editora: string;
  volume: string | null;
  descricao: string;
  categorias: string[];
  quantidade: number;
  fotoCapaUrl: string;
  oculto: boolean;
  motivoOcultacao: string | null;
  criadoPorId: string;
  editadoPorId: null;
  criadoEm: string;
  editadoEm: null;
}
