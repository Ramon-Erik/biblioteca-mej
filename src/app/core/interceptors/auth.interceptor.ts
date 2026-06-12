import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token =
    'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3ODEyODE0NjEsImV4cCI6MTc4MTM2Nzg2MX0.rBATTnCvHt0f2h0mA9R2EXQstH1FKtMhLBT-bfPwuYknaKRF8zNAzi54s6w-oN4s';
  const clonedReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer ' + token,
    },
  });
  return next(clonedReq);
};
