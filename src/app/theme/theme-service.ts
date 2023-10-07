import { Component, Injectable, Injector, OnInit } from '@angular/core';
Injectable()
export class ThemeService {
    normalTheme : boolean = false;
    getActiveTheme() {
        return this.normalTheme;
      }
    
      setActiveTheme(theme: boolean) {
        this.normalTheme = theme;
      }

}