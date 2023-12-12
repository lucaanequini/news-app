// navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './components/HomeScreen';
import CreateNews from './components/CreateNews';
import NewsDetails from './components/NewsDetails';
import Creations from './components/Creations';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Highlights" component={HomeScreen} />
        <Tab.Screen name="Creations" component={Creations} initialParams={{ screenName: 'Creations' }} />
        <Tab.Screen name="Details" component={NewsDetails} initialParams={{ screenName: 'Details' }} />
        <Tab.Screen name="Create News" component={CreateNews} initialParams={{ screenName: 'CreateNews' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default AppNavigator;
