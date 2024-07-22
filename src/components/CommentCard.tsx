import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../themes/color';
import {Comment} from 'src/types';
import {fontStyles} from '../themes/styles';

export interface CommentCardProps {
  comment: Comment;
}

export const CommentCard = (props: CommentCardProps) => {
  const {comment} = props;

  return (
    <View style={styles.commentItem}>
      <Text style={[styles.commentText, fontStyles.textRegularRegular]}>
        {comment.text}
      </Text>
      <Text style={[styles.commentAuthor, fontStyles.textSmallRegular]}>
        By {comment.by}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  commentItem: {
    backgroundColor: colors.commentBg,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },
  commentText: {
    marginBottom: 5,
  },
  commentAuthor: {
    color: colors.gray,
  },
});
