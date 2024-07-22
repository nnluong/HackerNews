import React from 'react';
import StoriesList from './StoriesList';
import {StoryType} from '../enums';

export const BestStories = () => {
  return (
    <>
      <StoriesList storyType={StoryType.Best} />
    </>
  );
};
