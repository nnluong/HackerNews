import React, {useEffect, useState} from 'react';
import {FlatList, ActivityIndicator} from 'react-native';
import {Story} from '../types';
import {fetchStoryIds, fetchStoryItem} from '../services/api';
import {StoryCard} from '../components/StoryCard';
import {StoryType} from '../enums';
import {useNavigation} from '@react-navigation/native';

export interface StoriesListProps {
  storyType: StoryType;
}

const StoriesList = (props: StoriesListProps) => {
  const {storyType} = props;
  const [storyIds, setStoryIds] = useState<number[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [page, setPage] = useState<number>(1);
  const storiesPerPage = 20;
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setIsLoading(true);
    fetchStories();
  }, [page]);

  const fetchStories = async () => {
    const ids = await fetchStoryIds(storyType);
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

  const onPressStoryDetail = (itemId: number) => {
    navigation.navigate('Story', {itemId: itemId});
  };

  return (
    <FlatList
      data={stories}
      renderItem={(item: {item: Story}) => (
        <StoryCard
          story={item.item}
          onPress={() => onPressStoryDetail(item.item.id)}
        />
      )}
      keyExtractor={(item: Story) => String(item.id)}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={() =>
        isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null
      }
    />
  );
};

export default StoriesList;
