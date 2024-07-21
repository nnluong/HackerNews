import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../themes/color';

export interface CommentCardProps {
  item: number;
}

export const CommentCard = (props: CommentCardProps) => {
  const {item} = props;

  return (
    <View style={styles.commentItem}>
      <Text>{item}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  commentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
});
