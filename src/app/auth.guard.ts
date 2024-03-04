import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true; // Permite acesso à rota se o usuário estiver autenticado
    } else {
      this.router.navigateByUrl('/login'); // Redireciona para a página de login se o usuário não estiver autenticado
      return false;
    }
  }
}
