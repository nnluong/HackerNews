import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Story} from '../types';
import {colors} from '../themes/color';
import {fontStyles} from '../themes/styles';

export interface StoryCardProps {
  story: Story;
  onPress?: () => void;
}

export const StoryCard = (props: StoryCardProps) => {
  const {story, onPress} = props;

  return (
    <TouchableOpacity onPress={onPress} style={styles.storyItem}>
      <Text style={[styles.storyTitle, fontStyles.textMediumBold]}>
        {story.title}
      </Text>
      <Text style={fontStyles.textRegular}>by {story.by}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  storyItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  storyTitle: {
    color: colors.black,
  },
});
