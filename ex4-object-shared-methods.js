import eurosFormatter from './euroFormatter.js';

function Wallet(name, cash) {
  this._name = name;
  this._cash = cash;
  this._dailyAllowance = 40;
  this._dayTotalWithdrawals = 0;
}

Wallet.prototype.deposit = function (amount) {
  this._cash += amount;
};

Wallet.prototype.withdraw = function (amount) {
  if (this._cash - amount < 0) {
    console.log(`Insufficient funds!`);
    return 0;
  }

  if (this._dayTotalWithdrawals + amount > this._dailyAllowance) {
    console.log(`Insufficient remaining daily allowance!`);
    return 0;
  }

  this._cash -= amount;
  this._dayTotalWithdrawals += amount;
  return amount;
};

Wallet.prototype.transferInto = function (wallet, amount) {
  console.log(
    `Transferring ${eurosFormatter.format(amount)} from ${
      this._name
    } to ${wallet.getName()}`
  );
  const withdrawnAmount = this.withdraw(amount);
  wallet.deposit(withdrawnAmount);
};

Wallet.prototype.reportBalance = function () {
  console.log(
    `Name: ${this._name}, balance: ${eurosFormatter.format(this._cash)}`
  );
};

Wallet.prototype.getName = function () {
  return this._name;
};

Wallet.prototype.setDailyAllowance = function (newAllowance) {
  if (newAllowance <= 0 || typeof newAllowance !== "number") {
    console.log("Invalid daily allowance!");
    return;
  }
  this._dailyAllowance = newAllowance;
  console.log(`${this._name}'s daily allowance set to: ${newAllowance}`);
};

Wallet.prototype.resetDailyAllowance = function () {
  this._dayTotalWithdrawals = 0;
  console.log(`${this._name}'s daily withdrawals reset to zero.`);
};

function main() {
  const walletJack = new Wallet("Jack", 100);
  const walletJoe = new Wallet("Joe", 10);

  walletJack.setDailyAllowance(50);
  walletJack.withdraw(30); // Success
  walletJack.withdraw(25); // Fails (exceeds daily allowance)

  walletJack.resetDailyAllowance();
  walletJack.withdraw(25); // Success after resetting

  walletJack.reportBalance();
  walletJoe.reportBalance();
}

main();
