import axios from 'axios';
import { useState, useEffect } from 'react';

export default resource => {
  const [resources, setResources] = useState([]);

  const fetchResources = async resource => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/${resource}`
    );
    setResources(response.data);
  };

  useEffect(() => {
    fetchResources(resource);
  }, [resource]);

  return resources;
};
