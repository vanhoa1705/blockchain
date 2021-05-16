import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../app-routing.module';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, AppRoutingModule, RouterModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
