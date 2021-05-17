import React, {useState, useEffect} from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {
// URL variable
const url = "https://dogs-backend-329-mkm.herokuapp.com"

// Create state to hold the list of dogs
const [dogs, setDogs] = useState([])

// Empty dog - For the Create Form 
const emptyDog = { 
  name: "", 
  age: 0, 
  img: ""
}

// selected dog state
const [selectedDog, setSelectedDog] = useState(emptyDog)
 
// get all the dogs
const getDogs = () => { 
  fetch(url + "/dog/")
  // use .then to take action when response comes in 
  .then((response) => response.json())
  // use the data from the response
  .then((data) => {
    setDogs(data)
  })
}

// useEffect to get the data right away 
useEffect(() => { 
  getDogs()
}, [])

// handleCreate - function for when the Create form is submitted
const handleCreate = (newDog) => { 
  fetch(url + "/dog", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json"
    }, 
    body: JSON.stringify(newDog)
  })
  .then(() => getDogs())
}

// handleUpdate - function for when edited form is submitted
const handleUpdate = (dog) => { 
  fetch(url + "/dog/" + dog._id, { 
    method: "PUT", 
    headers: { 
      "Content-Type": "application/json"
    }, 
    body: JSON.stringify(dog)
  })
  .then(() => { 
    getDogs()
  })
}

// function to specify which dog we are updating
const selectDog = (dog) => { 
  setSelectedDog(dog)
}

// deleteDog to delete individual dogs
const deleteDog = (dog) => { 
  fetch (url + "/dog/" + dog._id, { 
    method: "delete"
  })
  .then(() => getDogs())
}

  return (
    <div className="App">
      <h1>DOG LISTING SITE</h1>
      <hr />
      <Link to="/create">
      <button>Add Dog</button>
      </Link>
      <main>
        <Switch>
          <Route exact path="/" render={(rp) => <Display 
          {...rp} 
          dogs ={dogs}
          selectDog={selectDog} 
          deleteDog={deleteDog}
          />} />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" dog={emptyDog} handleSubmit={handleCreate} />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form 
              {...rp} 
              label="update" 
              dog={selectedDog} 
              handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
