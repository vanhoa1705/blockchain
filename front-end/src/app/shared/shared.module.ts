import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards/auth-guard.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [],
  exports: [],
})
export class SharedModule {}

export { AuthGuard };
