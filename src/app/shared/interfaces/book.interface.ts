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
  volume: string;
  descricao: string;
  categorias: string;
  quantidade: 1;
  fotoCapaUrl: string;
  oculto: false;
  motivoOcultacao: null;
  criadoPorId: string;
  editadoPorId: null;
  criadoEm: string;
  editadoEm: null;
}
