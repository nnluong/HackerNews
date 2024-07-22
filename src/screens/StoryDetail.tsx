import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, StyleProp, TextStyle} from 'react-native';
import {Story} from '../types';
import {fetchStoryItem} from '../services/api';
import {colors} from '../themes/color';
import {fontStyles} from '../themes/styles';
import CommentsList from '../components/CommentsList';

const StoryDetail: React.FC<{route: any}> = ({route}) => {
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStory();
  }, []);

  const fetchStory = async () => {
    if (route.params) {
      setLoading(true);
      const fetchedStory = await fetchStoryItem(route.params.itemId);
      setStory(fetchedStory);
      setLoading(false);
    }
  };

  if (!story) {
    return <View />;
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
      {renderStoryInfo(
        [styles.storyTitle, fontStyles.textLargeBold],
        story.title,
      )}
      {renderStoryInfo(
        [styles.storyAuthor, fontStyles.textMediumRegular],
        `by ${story.by}`,
      )}
      {renderStoryInfo(styles.storyScore, `Score: ${story.score}`)}
      {renderStoryInfo(styles.storyUrl, story.url)}
      {story.kids && (
        <>
          {renderStoryInfo(
            [styles.commentsTitle, fontStyles.textMediumBold],
            `Comments:`,
          )}
          {<CommentsList kids={story.kids} />}
        </>
      )}
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
    marginBottom: 10,
    color: colors.black,
  },
  storyAuthor: {
    marginBottom: 10,
  },
  storyScore: {
    marginBottom: 10,
    color: colors.red,
  },
  storyUrl: {
    marginBottom: 20,
    color: colors.blue,
  },
  commentsTitle: {
    marginBottom: 10,
    color: colors.black,
  },
});

export default StoryDetail;
