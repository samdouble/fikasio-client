import React, { useEffect, useState } from 'react';

const ResourcesHandler = ({ resources, resourceFetchers, getContents }) => {
  const [isLoading, setIsLoading] = useState(true);

  const areResourcesFetched = () => resources.every(resource => resource !== null);

  const fetchResources = () => {
    Promise.all(
      resourceFetchers.map(async fetcher => {
        await fetcher();
        setIsLoading(false);
      }),
    );
  };

  useEffect(() => {
    if (areResourcesFetched()) {
      setIsLoading(false);
    } else {
      fetchResources();
    }
  }, [resources]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return getContents(resources);
};

export default ResourcesHandler;
