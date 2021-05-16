const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
import crypto from "crypto";

export class Wallet {
  public privateKey: string;
  public publicKey: any;

  constructor() {
    const myKey = ec.genKeyPair();
    this.privateKey = myKey.getPrivate().toString(16);
    this.publicKey = ec
      .keyFromPrivate(this.privateKey, "hex")
      .getPublic()
      .encode("hex");
  }
}
