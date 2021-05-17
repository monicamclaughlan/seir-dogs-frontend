import React from "react";

const Display = ({dogs, selectDog, history, deleteDog}) => {

  // return the JSX for when you have dogs
  const loaded = () => (
    <div style={{textAlign:"center"}}>
      {dogs.map((dog, index) => (
        <article key={dog._id}>
          <img src={dog.img} alt="Dog"/>
          <h1>{dog.name}</h1>
          <h3>{dog.age}</h3>
          <button onClick={() => {
            selectDog(dog)
            history.push("/edit") //basically like using a link
          }}>Edit</button>
          <button onClick={() => {deleteDog(dog)}}>Delete</button>
        </article>

      ))}
      </div>
  )

  const loading = () =>  <h1>Loading...</h1>
  

  return dogs.length > 0  ? loaded() : loading()  

};

export default Display;
