import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import {Story} from '../types';
import {fetchStoryIds, fetchStoryItem} from '../services/api';
import {StoryCard} from '../components/StoryCard';

const Home: React.FC<{navigation: any}> = ({navigation}) => {
  const [storyIds, setStoryIds] = useState<number[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [page, setPage] = useState<number>(1);
  const storiesPerPage = 20;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchStories();
  }, [page]);

  const fetchStories = async () => {
    const ids = await fetchStoryIds('top');
    setStoryIds(ids);
    const currentStories = await Promise.all(
      ids
        .slice((page - 1) * storiesPerPage, page * storiesPerPage)
        .map(id => fetchStoryItem(id)),
    );
    setStories(
      currentStories.filter((story): story is Story => story !== null),
    );
    setIsLoading(false);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={stories}
        renderItem={(item: {item: Story}) => (
          <StoryCard
            story={item.item}
            onPress={() => navigation.navigate('Story', {itemId: item.item.id})}
          />
        )}
        keyExtractor={(item: Story) => String(item.id)}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          isLoading ? (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              style={styles.loadingIndicator}
            />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
