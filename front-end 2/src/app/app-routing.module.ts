import { HistoryComponent } from './components/history/history.component';
import { PendingTransactionComponent } from './components/pending-transaction/pending-transaction.component';
import { SendComponent } from './components/send/send.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './shared/guards/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'send', component: SendComponent, canActivate: [AuthGuard] },
  {
    path: 'pending-transaction',
    component: PendingTransactionComponent,
    canActivate: [AuthGuard],
  },
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
