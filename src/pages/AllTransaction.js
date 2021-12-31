import React from "react";
import Transaction from "../components/transaction";

const AllTransaction = (props) => {
  // For each transaction in the array render a Transaction component
  return props.transactions.map((transaction) => <Transaction transaction={transaction} key={transaction.id} />);
};

export default AllTransaction;