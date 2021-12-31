import React from "react";
import { Link } from "react-router-dom";

//destructure the transaction from props
const Transaction = ({ transaction }) => {
  //////////////////
  // Style Objects
  //////////////////
  const div = {
    textAlign: "center",
    border: "3px solid",
    margin: "10px auto",
    width: "80%",
  };
  return (
    <div style={div}>
      <Link to={`/transaction/${transaction.id}`}>
        <h1>{transaction.subject}</h1>
      </Link>
      <h2>{transaction.details}</h2>
    </div>
  );
};

export default Transaction;