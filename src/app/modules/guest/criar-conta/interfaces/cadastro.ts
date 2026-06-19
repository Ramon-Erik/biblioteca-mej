export interface cadastroRequest {
  nomeCompleto: string;
  email: string;
  telefoneWhatsaap: string;
  senha: string;
}

export interface cadastroResponse {
  id: string;
  nomeCompleto: string;
  email: string;
  telefoneWhatsapp: string;
  role: 'ADMIN' | 'LEITOR';
  token: string;
}

export interface confirmarCadastroRequest {
  email: string;
  codigo: string;
}
