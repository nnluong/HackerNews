import React, {useMemo} from 'react';
import {useWindowDimensions} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {NewStories} from './NewStories';
import {BestStories} from './BestStories';
import {TopStories} from './TopStories';

const Home = () => {
  const layoutTab = useWindowDimensions();
  const [routes] = React.useState([
    {key: 'new', title: 'New'},
    {key: 'best', title: 'Best'},
    {key: 'top', title: 'Top'},
  ]);
  const [tabIndex, setTabIndex] = React.useState(0);

  const renderScene = SceneMap({
    new: () => <NewStories />,
    best: () => <BestStories />,
    top: () => <TopStories />,
  });

  const memoizedRenderScene = useMemo(() => renderScene, []);

  return (
    <TabView
      lazy
      navigationState={{index: tabIndex, routes}}
      renderScene={memoizedRenderScene}
      onIndexChange={setTabIndex}
      swipeEnabled={false}
      initialLayout={{width: layoutTab.width}}
    />
  );
};

export default Home;
