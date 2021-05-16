import { LeftMenuModule } from './../left-menu/left-menu.module';
import { HeaderModule } from './../header/header.module';
import { HistoryComponent } from './history.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule,
    MatProgressSpinnerModule,
    HeaderModule,
    LeftMenuModule,
  ],
  exports: [HistoryComponent],
})
export class HistoryModule {}
