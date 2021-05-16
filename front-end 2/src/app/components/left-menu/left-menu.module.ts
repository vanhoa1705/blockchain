import { LeftMenuComponent } from './left-menu.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../header/header.module';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [LeftMenuComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule,
    BrowserModule,
    HeaderModule,
    MatIconModule,
  ],
  exports: [LeftMenuComponent],
})
export class LeftMenuModule {}
