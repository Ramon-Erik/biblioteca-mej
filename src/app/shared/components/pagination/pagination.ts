import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { PaginationState } from '@shared/interfaces/pagination.interface';

@Component({
  selector: 'app-pagination',
  imports: [NgClass],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  public paginationInfo = input.required<PaginationState>();
  public pageChange = output<number>();

  public onPageClick(pageIndex: number): void {
    this.pageChange.emit(pageIndex);
  }
}
