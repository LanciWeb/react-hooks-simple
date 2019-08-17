//# useEffect
/**
 * * Allow a functional component to use lifecycle methods  
 * !To be more precise useEffect REPLACES the class lifecycle methods.
 * 
 * Inside a functional component we can declare multiple useEffect functions, just like multiple useState, divided bt topic.
 * we pass them some logic and functions that will be executed BOTH at mount AND at update.
 * !There will be no need to handle componentDidUpdate Behaviours, because useEffect handles them automatically.
 * For instance, we will no longer be force to copy the same logic between mount and update and make the check with prev props:
 */

//? BAD example with Class component
async componentDidMount() {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/${this.props.resource}`
  );
  this.setState({ resources: response.data });
}

async componentDidUpdate(prevProps) {
  if (prevProps.resource !== this.props.resource) { //! Same code as above with if check on prev props
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/${this.props.resource}`
    );
    this.setState({ resources: response.data });
  }
}

//# run both at Mount and Update (default behaviour)
/**
 * Here is how we acheive the same bahaviour with useEffect
 * 
 * TODO 1 - import useEffect
 * TODO 2 - declare a useEffect function 
 * TODO 3 - put logic inside the useEffect function
 * TODO 4 - provide an array with values to be "observed" by use effect: if any of them changes, useEffect will run again
 * ! WARN 1 the "observed" values must be explicitly present in the useEffect function 
 * ! WARN 2 if the array is not provided as second argument, useEffect goes into loop!!!
 * ! WARN 3 Promises are not allowed inside the useEffect, we need to define it outside
 * 
 * ?NOTE: just as with useState, we declare multiple effects divided by topic so that logics are not mixed in one lifecycle method
 */

import axios from 'axios';
import React, { useState, useEffect } from 'react'; //#1

const ResourceList = ({ resource }) => {
  const [resources, setResources] = useState([]);

  const fetchResource = async resource => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/${resource}`
    );
    setResources(response.data);
  };

  useEffect(() => { //#2
    //#3
    fetchResource(resource); //!WARN 1 (do not rely on state or props inside fetchResources but pass it as an argument)
  }, [resource]); //#4

  return <div>{resources.length}</div>;
};

export default ResourceList;

//# run only at Mount
/**
 * The second argument of useEffect is an array in which we define the variables we want to observe
 * if any of them changes, useEffect will be triggered again.
 * If we do not provide the array, the useEffect will be triggered in a loop!
 * therefore, if there is the need to only trigger useEffect at mount, this is the trick:
 * !providing an empty array as a second value, results in a single triggered effect (after the component mounted)
 */
useEffect(() => {doSomething()}, [])

//# run at Unmount
/**
 * There may be cases in which we want to run it also at unmount.
 * !If we RETURN something from useEffect, that something will be executed at ComponentUnmount.
 */
useEffect(() => {
  fetchSomething(response);
  return clearReducer() //! <- clearReducer will be called at component Unmount
}, [response])
