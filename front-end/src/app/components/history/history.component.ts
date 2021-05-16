import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { WalletService } from 'src/app/shared/services/wallet.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  history = [];
  myWalletAddress: string = localStorage.getItem('publicKey');

  constructor(private title: Title, private walletService: WalletService) {
    this.title.setTitle('History');
  }

  ngOnInit(): void {
    this.walletService.getHistory().subscribe((data: any) => {
      this.history = data.history;
    });
  }
}
