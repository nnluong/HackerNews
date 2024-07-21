import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import {Story} from '../types';
import {fetchStoryItem} from '../services/api';
import {CommentCard} from '../components/CommentCard';

const StoryDetail: React.FC<{route: any}> = ({route}) => {
  const [story, setStory] = useState<Story | null>(null);

  useEffect(() => {
    fetchStory();
  }, []);

  const fetchStory = async () => {
    if (route.params) {
      const fetchedStory = await fetchStoryItem(route.params.itemId);
      setStory(fetchedStory);
    }
  };

  if (!story) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderStoryInfo = (
    style?: StyleProp<TextStyle> | undefined,
    data?: string,
  ) => {
    if (!data) return;
    return <Text style={style}>{data}</Text>;
  };

  return (
    <View style={styles.container}>
      {renderStoryInfo(styles.storyTitle, story.title)}
      {renderStoryInfo(styles.storyAuthor, `by ${story.by}`)}
      {renderStoryInfo(styles.storyScore, `Score: ${story.score}`)}
      {renderStoryInfo(styles.storyUrl, story.url)}
      {renderStoryInfo(styles.commentsTitle, `Comments:`)}
      <FlatList
        data={story.kids ? story.kids : []}
        renderItem={item => (
          <CommentCard item={item.item} style={styles.commentItem} />
        )}
        keyExtractor={(item: number) => String(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  storyAuthor: {
    fontSize: 16,
    marginBottom: 10,
  },
  storyScore: {
    marginBottom: 10,
    color: 'red',
  },
  storyUrl: {
    marginBottom: 20,
    color: 'blue',
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  commentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default StoryDetail;
