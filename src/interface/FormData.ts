interface Transaction {
    counterId: string;
    foodId: string;
    quantity: number;
}

interface TransactionLog {
    cashierId: string;
    paymentMethod: string;
}

export interface FormData {
    transactions: Transaction[];
    transactionLogs: TransactionLog[];
}