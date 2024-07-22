import React, {useEffect, useState} from 'react';
import {FlatList, ActivityIndicator} from 'react-native';
import {Comment} from '../types';
import {fetchComment} from '../services/api';
import {CommentCard} from './CommentCard';
import {colors} from '../themes/color';

export interface CommentsListProps {
  kids: number[];
}

const CommentsList = (props: CommentsListProps) => {
  const {kids} = props;
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setLoading(true);
    const commentsPromises = kids.map(async (commentId: number) => {
      const fetchedComment = await fetchComment(commentId);
      return fetchedComment;
    });
    const commentsData = (await Promise.all(commentsPromises)) as Comment[];
    setComments(commentsData);
    setLoading(false);
  };

  if (loading) {
    return <ActivityIndicator size="small" color={colors.indicator} />;
  }

  return (
    <FlatList
      data={comments}
      renderItem={(item: {item: Comment}) => (
        <CommentCard comment={item.item} />
      )}
      keyExtractor={(item: Comment) => String(item.id)}
    />
  );
};

export default CommentsList;
