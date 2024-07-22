import React from 'react';
import StoriesList from '../components/StoriesList';
import {StoryType} from '../enums';

export const BestStories = () => {
  return (
    <>
      <StoriesList storyType={StoryType.Best} />
    </>
  );
};
