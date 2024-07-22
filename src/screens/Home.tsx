import React, {useEffect, useState} from 'react';
import {StyleSheet, useWindowDimensions, Text, Dimensions} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {NewStories} from './NewStories';
import {BestStories} from './BestStories';
import {TopStories} from './TopStories';
import {colors} from '../themes/color';
import {fontStyles} from '../themes/styles';

const Home: React.FC<{navigation: any}> = ({navigation}) => {
  const layoutTab = useWindowDimensions();
  const [routes] = React.useState([
    {key: 'new', title: 'New'},
    {key: 'best', title: 'Best'},
    {key: 'top', title: 'Top'},
  ]);
  const [tabIndex, setTabIndex] = React.useState(0);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'new':
        return <NewStories />;
      case 'best':
        return <BestStories />;
      case 'top':
        return <TopStories />;
      default:
        return null;
    }
  };

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicatorStyle}
      style={{
        backgroundColor: colors.tabBg,
        margin: 0,
        padding: 0,
        height: 42,
        elevation: 0, // for Android
        shadowOffset: {
          width: 0,
          height: 0, // for iOS
        },
      }}
      scrollEnabled
      renderLabel={({route, focused}) => (
        <Text
          style={[
            fontStyles.textMediumBold,
            {color: focused ? colors.blue : colors.gray},
          ]}>
          {route.title}
        </Text>
      )}
      tabStyle={styles.tabStyle}
    />
  );

  return (
    <TabView
      navigationState={{index: tabIndex, routes}}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setTabIndex}
      swipeEnabled={false}
      initialLayout={{width: layoutTab.width}}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabStyle: {
    width: 'auto',
    marginHorizontal: 10,
    paddingHorizontal: 5,
  },
  indicatorStyle: {
    backgroundColor: colors.blue,
    height: 3,
  },
});

export default Home;
