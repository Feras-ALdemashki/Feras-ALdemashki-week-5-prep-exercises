import eurosFormatter from './euroFormatter.js';

function deposit(amount) {
  this._cash += amount;
}

function withdraw(amount) {
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
}

function transferInto(wallet, amount) {
  console.log(
    `Transferring ${eurosFormatter.format(amount)} from ${this._name} to ${wallet.getName()}`
  );
  const withdrawnAmount = this.withdraw(amount);
  wallet.deposit(withdrawnAmount);
}

function reportBalance() {
  console.log(
    `Name: ${this._name}, balance: ${eurosFormatter.format(this._cash)}`
  );
}

function getName() {
  return this._name;
}

function resetDailyAllowance() {
  this._dayTotalWithdrawals = 0;
  console.log(`${this._name}'s daily withdrawals have been reset.`);
}

function setDailyAllowance(newAllowance) {
  if (newAllowance <= 0 || typeof newAllowance !== "number") {
    console.log("Invalid daily allowance!");
    return;
  }
  this._dailyAllowance = newAllowance;
  console.log(`${this._name}'s daily allowance has been updated to: ${newAllowance}`);
}

function createWallet(name, cash = 0) {
  return {
    _name: name,
    _cash: cash,
    _dailyAllowance: 40,
    _dayTotalWithdrawals: 0,
    deposit,
    withdraw,
    transferInto,
    reportBalance,
    getName,
    resetDailyAllowance,
    setDailyAllowance,
  };
}

function main() {
  const walletJack = createWallet("Jack", 100);
  const walletJoe = createWallet("Joe", 10);

  walletJack.setDailyAllowance(50);
  walletJack.withdraw(30); // Success
  walletJack.withdraw(25); // Fails (exceeds daily allowance)

  walletJack.resetDailyAllowance();
  walletJack.withdraw(25); // Success after resetting

  walletJack.reportBalance();
  walletJoe.reportBalance();
}

main();
