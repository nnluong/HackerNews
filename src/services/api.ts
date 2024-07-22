import {StoryType} from './../enums';
import {Story, Comment} from './../types';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0/',
});

export const fetchStoryIds = async (type: StoryType): Promise<number[]> => {
  try {
    const response = await api.get(`${type}stories.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching story ids:', error);
    return [];
  }
};

export const fetchStoryItem = async (itemId: number): Promise<Story | null> => {
  try {
    const response = await api.get(`item/${itemId}.json`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching story item ${itemId}:`, error);
    return null;
  }
};

export const fetchComment = async (
  commentId: number,
): Promise<Comment | null> => {
  try {
    const response = await api.get(`item/${commentId}.json`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching story item ${commentId}:`, error);
    return null;
  }
};
