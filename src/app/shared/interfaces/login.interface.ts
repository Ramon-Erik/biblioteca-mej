export interface LoginRequest {
  identificador: string;
  senha: string;
}

export interface LoginResponse {
  id: string;
  nomeCompleto: string;
  email: string;
  telefoneWhatsapp: string;
  role: 'ADMIN' | 'LEITOR';
  token: string;
}

export interface UserData {
  id: string;
  nomeCompleto: string;
  email: string;
  role: 'ADMIN' | 'LEITOR' | '';
  telefoneWhatsapp: string;
}
