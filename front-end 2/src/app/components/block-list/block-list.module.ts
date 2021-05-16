import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BlockListComponent } from './block-list.component';

@NgModule({
  declarations: [BlockListComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule,
    MatProgressSpinnerModule,
  ],
  exports: [BlockListComponent],
})
export class BlockListModule {}
