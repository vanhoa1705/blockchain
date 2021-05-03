import { CreateWalletComponent } from './../create-wallet/create-wallet.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { WalletService } from 'src/app/shared/services/wallet.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  formLogin: FormGroup;
  constructor(
    private title: Title,
    private router: Router,
    private fb: FormBuilder,
    private snotifyService: SnotifyService,
    private dialog: MatDialog,
    private walletService: WalletService
  ) {
    this.title.setTitle('Login');
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      privateKey: ['', Validators.required],
    });
  }

  public createWallet = () => {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';

    const temp = this.dialog.open(CreateWalletComponent, dialogConfig);
  };

  public accessWallet = () => {
    this.walletService
      .accessWallet(this.formLogin.value)
      .subscribe((data: any) => {
        localStorage.setItem('publicKey', data.publicKey);
        localStorage.setItem('privateKey', this.formLogin.value.privateKey);
        this.router.navigate(['/home']);
        this.walletService.initWallet().subscribe();

        return;
      });
  };
}
