import React, { useEffect, useState } from 'react';
import { getStoryIds } from '../services/hnApi';

const StoriesContainer = () => {
  const [storyIds, setStoryIds] = useState([]);

  async function fetchData() {
    const ids = await getStoryIds();
    setStoryIds(ids);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <p>{JSON.stringify(storyIds)}</p>
  );
};

export default StoriesContainer;
