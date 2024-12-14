import eurosFormatter from './euroFormatter.js';

class Wallet {
  #name;
  #cash;
  #dailyAllowance ;
  #dayTotalWithdrawals ;

  constructor(name, cash, dailyAllowance,dayTotalWithdrawals ) {
    this.#name = name;
    this.#cash = cash;
    this.#dailyAllowance = 40;
    this.#dayTotalWithdrawals = 0;
  }

  get name() {
    return this.#name;
  }
  setDailyAllowance(newAllowance){
    if(newAllowance <= 0 || typeof newAllowance !== 'number'){
       console.log("Invalid daily allowance!")
    }
    else{ this.#dailyAllowance = newAllowance}
  }

  resetDailyAllowance(){
    this.#dayTotalWithdrawals = 0;
  }

  deposit(amount) {
    this.#cash += amount;
  }

  withdraw(amount) {
    if (this.#dailyAllowance + amount < this.#dayTotalWithdrawals ) {
      console.log(`Insufficient funds!`);
      return 0;
    }

    this.#cash -= amount;
    return amount;
  }

  transferInto(wallet, amount) {
    console.log(
      `Transferring ${eurosFormatter.format(amount)} from ${this.name} to ${
        wallet.name
      }`
    );
    const withdrawnAmount = this.withdraw(amount);
    wallet.deposit(withdrawnAmount);
  }

  reportBalance() {
    console.log(
      `Name: ${this.name}, balance: ${eurosFormatter.format(this.#cash)}`
    );
  }
}

function main() {
  const walletJack = new Wallet('Jack', 100);
  const walletJoe = new Wallet('Joe', 10);
  const walletJane = new Wallet('Jane', 20);

  walletJack.transferInto(walletJoe, 50);
  walletJane.transferInto(walletJoe, 25);

  walletJane.deposit(20);
  walletJane.transferInto(walletJoe, 25);

  walletJack.reportBalance();
  walletJoe.reportBalance();
  walletJane.reportBalance();
}

main();