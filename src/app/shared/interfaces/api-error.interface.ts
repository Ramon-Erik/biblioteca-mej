export interface ApiErrorPayload {
  timestamp: string;
  status: number;
  erro: string;
  mensagem: string;
  path: string;
  campos: ApiValidationErrorField[];
}

export interface ApiValidationErrorField {
  campo: string;
  mensagem: string;
}

import { HttpErrorResponse } from '@angular/common/http';

export interface ApiHttpErrorResponse extends HttpErrorResponse {
  readonly error: ApiErrorPayload;
}
