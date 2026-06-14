import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token =
    'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3ODEzNTQ1NzMsImV4cCI6MTc4MTQ0MDk3M30.G_9_irT_bhDxWFoLff_LA8ePRXH8m0v769iz-zuM59Znn_hjDMyFSUxh7ZyqSQLR';
  const clonedReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer ' + token,
    },
  });
  return next(clonedReq);
};
