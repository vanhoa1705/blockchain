import { WalletService } from './../../shared/services/wallet.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-create-wallet',
  templateUrl: './create-wallet.component.html',
  styleUrls: ['./create-wallet.component.scss'],
})
export class CreateWalletComponent implements OnInit {
  public createWalletForm = new FormGroup({
    privateKey: new FormControl('', Validators.required),
    publicKey: new FormControl('', Validators.required),
  });

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private walletService: WalletService
  ) {}

  public close = () => {
    this.dialogRef.close(false);
  };

  public createWallet = () => {
    this.walletService.createWallet().subscribe((data: any) =>
      this.createWalletForm.patchValue({
        privateKey: data.privateKey,
        publicKey: data.publicKey,
      })
    );
  };

  public saveWallet = () => {
    var blob = new Blob([JSON.stringify(this.createWalletForm.value)], {
      type: 'text/plain;charset=utf-8',
    });
    saveAs(blob, 'myWallet.txt');
  };

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    });
  }
}
