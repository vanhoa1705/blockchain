import { LeftMenuModule } from './../left-menu/left-menu.module';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../header/header.module';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule,
    BrowserModule,
    HeaderModule,
    LeftMenuModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
