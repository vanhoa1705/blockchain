import { HistoryModule } from './components/history/history.module';
import { HomeModule } from './components/home/home.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { HeaderModule } from './components/header/header.module';
import { LeftMenuModule } from './components/left-menu/left-menu.module';
import { CreateWalletComponent } from './components/create-wallet/create-wallet.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { SendComponent } from './components/send/send.component';
import { PendingTransactionComponent } from './components/pending-transaction/pending-transaction.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateWalletComponent,
    SendComponent,
    PendingTransactionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SnotifyModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    HeaderModule,
    LeftMenuModule,
    HomeModule,
    MatFormFieldModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    HistoryModule,
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
