import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/shared/services/wallet.service';

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.scss'],
})
export class BlockListComponent implements OnInit {
  chain = [];
  transactions = [];
  myWalletAddress = localStorage.getItem('publicKey');

  constructor(private walletService: WalletService) {}

  showTransaction = (block) => {
    this.transactions = block.transactions;
  };

  ngOnInit(): void {
    this.walletService.getChain().subscribe((data: any) => {
      this.chain = data.blockchain.chain;
      this.transactions = this.chain[0].transactions;
    });
  }
}
