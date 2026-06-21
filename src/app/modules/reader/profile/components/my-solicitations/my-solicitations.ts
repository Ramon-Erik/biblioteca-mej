import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { AsyncPipe } from '@angular/common';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-solicitations',
  imports: [AsyncPipe],
  templateUrl: './my-solicitations.html',
  styleUrl: './my-solicitations.scss',
})
export class MySolicitations implements OnInit {
  private profileService = inject(ProfileService);
  private toastr = inject(ToastrService);

  public loading = signal(false);

  public solicitations$ = this.profileService.myRequests;

  public handleDisaprove(id: string) {
    this.loading.set(true);
    this.profileService
      .disaproveRequest(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.toastr.info('Solicitação cancelada!');
        },
        error: (error) => {
          const title = error.error.erro || 'Erro ao realizar operação';
          const msg = error.error.mensagem || 'Problemas com o servidor';
          this.toastr.error(msg, title, { timeOut: 5500 });
        },
      });
  }

  ngOnInit() {
    this.profileService.getMyRequests().subscribe();
  }
}
