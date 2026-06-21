export interface ReenviarCodeResponse {
  mensagem: string;
}

export interface cadastroRequest {
  nomeCompleto: string;
  email: string;
  telefoneWhatsapp: string;
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

export interface SolicitarAlteracaoRequest {
  email: string;
}

export interface SolicitarAlteracaoResponse {
  mensagem: string;
  success?: boolean;
}

export interface AlterarSenhaRequest {
  token: string;
  novaSenha: string;
  confirmarSenha: string;
}

export interface AlterarSenhaResponse {
  mensagem: string;
  success?: boolean;
}

export interface ErrorResponse {
  timestamp: string;
  status: number;
  erro: string;
  mensagem: string;
  path: string;
  campos?: {
    campo: string;
    mensagem: string;
  }[];
}
