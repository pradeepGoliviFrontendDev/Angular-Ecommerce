import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemeService } from './theme-service';

@Component({
  selector: 'app-theme-selector',
  template: `
    <button (click)="toggleTheme()">Toggle Theme</button>
  `,
})
export class ThemeSelectorComponent {
    @Input() normalTheme = false;
    @Output() onChange = new EventEmitter<boolean>();
  constructor(private themeService: ThemeService) {}

  public toggleTheme(){
    // let theme =  this.themeService.getActiveTheme();
    // this.themeService.setActiveTheme(this.normalTheme);
    // this.normalTheme = theme;
    this.onChange.emit(this.normalTheme);
  }
}
