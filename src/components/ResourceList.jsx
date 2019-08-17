import React from 'react';
import useResources from '../hooks/useResources';

const ResourceList = ({ resource }) => {
  const renderList = resources =>
    resources.map(({ id, title }) => <li key={id}>{title}</li>);

  const resources = useResources(resource);

  return (
    <section>
      <ul>{renderList(resources)}</ul>
    </section>
  );
};

export default ResourceList;
