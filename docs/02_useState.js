//# useState
/**
 * * Allow a functional component to use component-level state
 * TODO 1 - Import useState from React
 * TODO 2 - destructure the useState Array so that we have the value of the state in the first array element, and the setState function in the second element
 * TODO 3 - provide a default value to the state as the argument of the useState function
 * TODO 4 - use the first element of the array to read the state value
 * TODO 5 - use the second element of the array to set the state value
 * ! the setter method coming from the useState, is not UPDATING the state, it COMPLETELY REPLACES the previous state
 *
 * ? with Hooks, we can initialize many useState and split all the pieces of the state
 */

import React, { useState } from 'react'; //#1

const App = () => {
  const [resource, setResource] = useState('posts'); //#2 #3
  const [name, setName] = useState('Marco'); //? NOTA
  return (
    <div>
      <h1>{name}</h1>
      <div>
        <button onClick={() => setResource('posts')}>post</button> //#5
        <button onClick={() => setResource('todos')}>Todos</button>
      </div>
      {resource} //#4
    </div>
  );
};

export default App;
