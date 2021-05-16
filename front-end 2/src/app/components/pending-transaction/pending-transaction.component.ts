import { WalletService } from 'src/app/shared/services/wallet.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pending-transaction',
  templateUrl: './pending-transaction.component.html',
  styleUrls: ['./pending-transaction.component.scss'],
})
export class PendingTransactionComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'fromAddress',
    'toAddress',
    'amount',
    'timestamp',
  ];
  dataSource: MatTableDataSource<TransactionData> = null;
  isLoading = false;

  constructor(private title: Title, private walletService: WalletService) {
    this.title.setTitle('Pending transaction');
  }

  public startMining = () => {
    this.walletService.miningPendingTransaction().subscribe((data: any) => {
      this.getPendingTransactions();
    });
  };

  public getPendingTransactions() {
    this.isLoading = true;
    this.walletService.getPendingTransaction().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource<TransactionData>(
        data.pendingTransactions
      );
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.getPendingTransactions();
  }
}

export interface TransactionData {
  fromAddress: string;
  toAddress: string;
  amount: number;
  timestamp: number;
  signature: string;
}
