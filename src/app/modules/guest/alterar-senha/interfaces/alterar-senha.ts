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
  campos?: Array<{
    campo: string;
    mensagem: string;
  }>;
}