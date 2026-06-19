import { Component, input, output } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { User } from '@shared/interfaces/user.interface';
import { CommonModule } from '@angular/common';

export type UserCardAction = 'PROMOTE' | 'DEMOTE' | 'BLOCK' | 'UNBLOCK';

export interface UserActionEvent {
  action: UserCardAction;
  user: User;
}

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule],
  templateUrl: './user-card.html',
  styleUrls: ['./user-card.scss'],
})
export class UserCard {
  public user = input.required<User>();

  // Receba o ID do admin logado para impedir que ele se auto-bloqueie/rebaixe
  public currentAdminId = input<string>('');

  public actionClick = output<UserActionEvent>();

  // Verifica se o card pertence ao próprio administrador visualizando a tela
  public get isMe(): boolean {
    return this.user().id === this.currentAdminId();
  }

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
    if (this.isMe) return; // Trava de segurança
    this.actionClick.emit({ action, user: this.user() });
  }
}
