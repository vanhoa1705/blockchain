import { WalletService } from 'src/app/shared/services/wallet.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss'],
})
export class SendComponent implements OnInit {
  formSend: FormGroup;
  constructor(
    private title: Title,
    private router: Router,
    private fb: FormBuilder,
    private walletService: WalletService
  ) {
    this.title.setTitle('Send');
  }

  ngOnInit(): void {
    this.formSend = this.fb.group({
      fromPublicKey: [localStorage.getItem('publicKey')],
      toPublicKey: ['', Validators.required],
      amount: ['', Validators.required],
      privateKey: [localStorage.getItem('privateKey')],
    });
  }

  public send = () => {
    this.walletService.send(this.formSend.value).subscribe();
  };
}
