import { Component, input, output } from '@angular/core';
import { NgClass } from '@angular/common';

type ButtonType = 'primary' | 'secondary';

@Component({
  selector: 'app-button-default',
  imports: [NgClass],
  templateUrl: './button-default.html',
  styleUrl: './button-default.scss',
})
export class ButtonDefault {
  public title = input.required<string>();        
  public disable = input<boolean>(false);        
  public type = input.required<ButtonType>();    

  public clicked = output<void>();               

  protected get buttonClasses(): string {
    const classes :string[] = [this.type()];
    
    if (this.disable()) {           
      classes.push('button-disabled');
    }
    
    return classes.join(' ');
  }
}