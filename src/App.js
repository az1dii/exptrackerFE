// Import our components
import AllTransaction from "./pages/AllTransaction";
import SingleTransaction from "./pages/SingleTransaction";
import Form from "./pages/Form";

// import React Hooks
import { useState, useEffect } from "react";

// Import React Router Components
import { Route, Switch, Link } from "react-router-dom";

function App(props) {
  ////////////
  // Style Objects
  ///////////

  const h1 = {
    textAlign: "center",
    margin: "10px",
  };

  const button = {
    backgroundColor: "navy",
    display: "block",
    margin: "auto"
  }

  //////////////////
  // State & Other Variables
  //////////////////

  //api url
  const url = "https://p4tracker.herokuapp.com/trackers";

  // state to hold list of lists
  const [posts, setTransactions] = useState([]);
  
  // an object that represents a null list as a starting point
  const nullList = {
    subject: "",
    details: "",
  }
  
  const [targetList, setTargetList] = useState(nullList)
  // const stat to hold list for editing


  ///////////////
  // Functions 
  ////////////////

  const getLists = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setTransactions(data)
  }

  const addLists = async (newList) => {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newList),
    })
    getLists();
  }

  const getTargetList = (list) => {
    setTargetList(list);
    props.history.push("/edit");
  }

  const updateList = async (list) => {
    const response = await fetch(url + list.id + "/", {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(list),
    });

    // get updated list of lists
    getLists();
  }

  // Function to edit list on form submission
  const deleteList = async (list) => {
    const response = await fetch(url + list.id + "/", {
      method: "delete",
    });

    // get updated list of lists
    getLists();
    props.history.push("/");
  };

  ///////////////
  // useEffects
  ///////////////
  // make the api call when the component
  // loads only the first time
  useEffect(() => {
    getLists()
  }, [])

  /////////////////
  // Returned JSX
  /////////////////
  return (
    <div className="App">
      <h1 style={h1}>My List List</h1>
      <Link to="/new"><button style={button}>Create New List</button></Link>
      <Switch>
          {/* INDEX PAGE */}
          <Route
            exact
            path="/"
            render={(rp) => {
              return <AllTransaction {...rp} posts={posts} />;
            }}
          />
          {/* SHOW PAGE */}
          <Route
            path="/post/:id"
            render={(rp) => {
              return <SingleTransaction 
              {...rp} 
              posts={posts} 
              edit={getTargetList}
              deleteList={deleteList}
            />;
            }}
          />
          {/* NEW AND EDIT FORM PAGES */}
          <Route
            path="/new"
            render={(rp) => {
              return <Form {...rp} 
              initialList={nullList}
              handleSubmit={addLists}
              buttonLabel="Add to my list"
            />;
            }}
          />
          <Route
            path="/edit"
            render={(rp) => {
              return <Form 
              {...rp} 
              initialList={targetList}
              handleSubmit={updateList}
              buttonLabel="Edit"
            />;
          }}
        />
      </Switch>
    </div>
  );
}

export default App;