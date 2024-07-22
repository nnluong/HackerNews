import React from 'react';
import StoriesList from './StoriesList';
import {StoryType} from '../enums';

export const TopStories = () => {
  return (
    <>
      <StoriesList storyType={StoryType.Top} />
    </>
  );
};
