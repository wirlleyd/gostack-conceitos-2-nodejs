import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const transactions = this.all();
    const income = transactions.reduce(
      (total, transaction) =>
        transaction.type === 'income' ? total + transaction.value : total,
      0,
    );
    const outcome = transactions.reduce(
      (total, transaction) =>
        transaction.type === 'outcome' ? total + transaction.value : total,
      0,
    );
    return {
      income,
      outcome,
      total: +(income - outcome).toFixed(2),
    };
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
