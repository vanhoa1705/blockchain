const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

export class Wallet {
  public privateKey: string;
  public publicKey: any;
  public walletAddress: string;

  constructor(privateKey: string) {
    this.privateKey = privateKey;
    this.publicKey = ec.keyFromPrivate(privateKey);
    this.walletAddress = this.publicKey.getPublic("hex");
  }
}
