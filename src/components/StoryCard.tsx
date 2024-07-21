import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Story} from '../types';

export interface StoryCardProps {
  story: Story;
  onPress?: () => void;
}

export const StoryCard = (props: StoryCardProps) => {
  const {story, onPress} = props;

  return (
    <TouchableOpacity onPress={onPress} style={styles.storyItem}>
      <Text style={styles.storyTitle}>{story.title}</Text>
      <Text style={styles.storyAuthor}>by {story.by}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  storyItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  storyAuthor: {
    fontSize: 14,
  },
});
