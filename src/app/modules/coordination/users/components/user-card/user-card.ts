import { Component, inject, input, output } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { User } from '@shared/interfaces/user.interface';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AuthService } from 'app/core/services/auth/auth.service';
import { map, take } from 'rxjs';

export type UserCardAction = 'PROMOTE' | 'DEMOTE' | 'BLOCK' | 'UNBLOCK';

export interface UserActionEvent {
  action: UserCardAction;
  user: User;
}

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule, AsyncPipe],
  templateUrl: './user-card.html',
  styleUrls: ['./user-card.scss'],
})
export class UserCard {
  private authService = inject(AuthService);
  public user = input.required<User>();

  public currentAdminId = this.authService.user$.pipe(map((u) => u?.id));

  public actionClick = output<UserActionEvent>();

  public get roleLabel(): string {
    return this.user().role === 'ADMIN' ? 'Administrador' : 'Leitor';
  }

  public get statusLabel(): string {
    const u = this.user();
    if (u.loginBloqueado) return '(Bloqueado)';
    if (!u.ativo) return '(Suspenso)';
    return '(Ativo)';
  }

  public get statusClass(): string {
    const u = this.user();
    if (u.loginBloqueado) return 'text-danger';
    if (!u.ativo) return 'text-warning';
    return 'text-success';
  }

  public emitAction(action: UserCardAction): void {
    this.currentAdminId.pipe(take(1)).subscribe((res) => {
      if (res !== this.user().id) {
        this.actionClick.emit({ action, user: this.user() });
      }
    });
  }
}
