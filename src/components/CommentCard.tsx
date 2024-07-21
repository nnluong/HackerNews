import * as React from 'react';
import {Text, View, StyleProp, ViewStyle} from 'react-native';

export interface CommentCardProps {
  item: number;
  style?: StyleProp<ViewStyle> | undefined;
}

export const CommentCard = (props: CommentCardProps) => {
  const {item, style} = props;

  return (
    <View style={style}>
      <Text>{item}</Text>
    </View>
  );
};
