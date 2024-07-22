import React from 'react';
import StoriesList from '../components/StoriesList';
import {StoryType} from '../enums';

export const TopStories = () => {
  return (
    <>
      <StoriesList storyType={StoryType.Top} />
    </>
  );
};
