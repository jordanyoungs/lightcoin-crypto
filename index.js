class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    // Calculate the balance using the transaction objects.
    let sum = 0;
    for (let transaction of this.transactions) {
      sum += transaction.value;
    }
    return sum;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }


}

class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }


  commit() {
    if (this.isAllowed()) {
      // Keep track of the time of the transaction
      this.time = new Date();
      // Add the transaction to the account
      this.account.addTransaction(this);
    } else {
      console.log("Cannot withdraw past zero!");
    }
  }

}


class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }


}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");

t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log('Transaction 3:', t3);

console.log('Balance:', myAccount.balance);
