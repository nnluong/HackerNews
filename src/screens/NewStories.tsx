import React from 'react';
import StoriesList from '../components/StoriesList';
import {StoryType} from '../enums';

export const NewStories = () => {
  return (
    <>
      <StoriesList storyType={StoryType.New} />
    </>
  );
};
