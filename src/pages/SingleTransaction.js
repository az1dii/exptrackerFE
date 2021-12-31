import React from "react";
import { Link } from "react-router-dom";

// destructuring the props needed to get our transaction, including router prop match
const SingleTransaction = ({ transactions, match, edit, deleteTodo }) => {
  const id = parseInt(match.params.id); //get the id from url param
  const transaction = transactions.find((transaction) => transaction.id === id);

  ////////////////////
  // Styles
  ///////////////////
  const div = {
    textAlign: "center",
    border: "3px solid green",
    width: "80%",
    margin: "30px auto",
  };

  return (
    <div style={div}>
      <h1>{transaction.subject}</h1>
      <h2>{transaction.details}</h2>
      <button onClick={(event) => edit(transaction)}>Edit</button>
      <button onClick={(event) => deleteTodo(transaction)}>Delete</button>
      <Link to="/">
        <button>Go Back</button>
      </Link>
    </div>
  );
};

export default SingleTransaction;