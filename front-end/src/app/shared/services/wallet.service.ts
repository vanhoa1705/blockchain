import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  private REST_API_SERVER = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  createWallet = () => {
    return this.httpClient
      .get(`${this.REST_API_SERVER}/api/wallet`, this.httpOptions)
      .pipe(catchError(this.handleError));
  };

  initWallet = () => {
    return this.httpClient
      .post(
        `${this.REST_API_SERVER}/api/blockchain/init`,
        { publicKey: localStorage.getItem('publicKey') },
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  };

  accessWallet = (privateKey: string) => {
    return this.httpClient
      .post(`${this.REST_API_SERVER}/api/wallet`, privateKey, this.httpOptions)
      .pipe(catchError(this.handleError));
  };

  getBalance = (publicKey: string) => {
    return this.httpClient
      .get(
        `${this.REST_API_SERVER}/api/blockchain/balance/${publicKey}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  };

  send = (transaction) => {
    return this.httpClient
      .post(
        `${this.REST_API_SERVER}/api/blockchain/send`,
        transaction,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  };

  getPendingTransaction = () => {
    return this.httpClient
      .get(
        `${this.REST_API_SERVER}/api/blockchain/pendingTransactions`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  };

  miningPendingTransaction = () => {
    return this.httpClient
      .post(
        `${this.REST_API_SERVER}/api/blockchain/minePendingTransactions`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  };
}
