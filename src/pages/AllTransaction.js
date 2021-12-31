import React from "react";
import Post from "../components/transaction";

const AllTransactions = (props) => {
  // For each transaction in the array render a Post component
  return props.transactions.map((transaction) => <Post transaction={transaction} key={transaction.id} />);
};

export default AllTransactions;