import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '@modules/visitante/login/service/login-service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  loginService = inject(LoginService);
  router = inject(Router);

  canActivate(): boolean {
    if (this.loginService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
