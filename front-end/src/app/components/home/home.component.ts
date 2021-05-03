import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/shared/services/wallet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public address: string = null;
  public balance: string = null;
  public network: string = null;
  public isLoading = false;
  constructor(private title: Title, private walletService: WalletService) {
    this.title.setTitle('Home');
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.address = localStorage.getItem('publicKey');
    this.walletService.getBalance(this.address).subscribe((data: any) => {
      this.balance = data.balance;
      this.isLoading = false;
    });
  }
}
