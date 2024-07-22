import React, {useEffect, useState} from 'react';
import {FlatList, ActivityIndicator} from 'react-native';
import {Story} from '../types';
import {fetchStoryIds, fetchStoryItem} from '../services/api';
import {StoryCard} from './StoryCard';
import {StoryType} from '../enums';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../themes/color';

export interface StoriesListProps {
  storyType: StoryType;
}

const StoriesList = (props: StoriesListProps) => {
  const {storyType} = props;
  const [storyIds, setStoryIds] = useState<number[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [page, setPage] = useState<number>(1);
  const storiesPerPage = 20;
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  console.log('storyType' + storyType);

  const getStoryIds = async () => {
    try {
      setLoading(true);
      const storyIds = await fetchStoryIds(storyType);
      setStoryIds(storyIds);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching story IDs:', error);
      setLoading(false);
    }
  };

  const fetchStories = async () => {
    setLoading(true);
    const sliceStart = (page - 1) * storiesPerPage;
    const sliceEnd = sliceStart + storiesPerPage;
    const currentIds = storyIds.slice(sliceStart, sliceEnd);
    const promises = currentIds.map(id => fetchStoryItem(id));
    try {
      const storiesData = (await Promise.all(promises)) as Story[];
      setStories(prevStories => [...prevStories, ...storiesData]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stories:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getStoryIds();
  }, []);

  useEffect(() => {
    if (storyIds.length > 0) {
      fetchStories();
    }
  }, [page, storyIds]);

  const handleLoadMore = () => {
    if (!loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const onPressStoryDetail = (itemId: number) => {
    navigation.navigate('Story', {itemId: itemId});
  };

  const renderFooter = () => {
    return loading ? (
      <ActivityIndicator size="large" color={colors.indicator} />
    ) : null;
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
      keyExtractor={(item: {id: number}, index: number) =>
        `${item.id}-${index}`
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
};

export default StoriesList;
