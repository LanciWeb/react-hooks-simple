//* CUSTOM HOOKS
/**
 * The main purpose of Hooks is code reuse.
 * Using the example we have buuilt so far (in useEffect.js), we can note that:
 * 1 - in order to run   all the logics of useState and useEffect only need the resource prop (coming from the app component)
 * 2 - all the logics of useState and useEffect returns a single array of elements (resources array coming from axios)
 *
 * Therefore we could easily abstract the hooks logics into a custom hook
 * ? So, this was the original file:
 */
import axios from 'axios';
import React, { useState, useEffect } from 'react';


const ResourceList = ({ resource }) => {
  const [resources, setResources] = useState([]);
  
  const fetchResource = async resource => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/${resource}`
      );
      setResources(response.data);
    };
    
    useEffect(() => {
      fetchResource(resource);
    }, [resource]);
    
  const renderList = resources => resources.map((resource, index) =><li>resource.title</li>)  
  
  return <div>{renderList(resources)}</div>;
};

export default ResourceList;

//#1 CREATE A CUSTOM HOOK
/**
 * TODO 1 - take out from the functional component all the logics of the hooks 
 * TODO 2 - create a new file for the custom hook; useSomething is the convention name
 * TODO 3 - in the new file, import anything needed, together with the hooks
 * TODO 4 - in the new file, declare a function that returns the same result that was returned into the original component logics
 * This function is a custom Hook at all effects and can be pasted into another file and used in any other component!
 */
import {useState, useEffect} from 'react' //#3
import axios from 'axios';

const useResources = resource => {
  const [resources, setResources] = useState([]);

  const fetchResource = async resource => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/${resource}`
    );
    setResources(response.data);
  };

  useEffect(() => {
    fetchResource(resource);
  }, [resource]);

  return resources; //#4
};


//#2 USE THE CUSTOM HOOK IN OTHER COMPONENT
/**
 * To use the custom hook in other components:
 * TODO 1 import the custom Hook file
 * TODO 2 just use its return value
 * TODO 3 use it with any other component! :) 
 * 
 * ! there is 0 logics in this component!!
 */

 import useResources from '../hooks/useResources' //#1

const ResourceList = ({ resource }) => {
  const renderList = resources =>
    resources.map(({ id, title }) => <li key={id}>{title}</li>);

  const resources = useResources(resource); //#2

  return (
    <section>
      <ul>{renderList(resources)}</ul>
    </section>
  );
};

export default ResourceList;