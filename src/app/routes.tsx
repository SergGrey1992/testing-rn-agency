import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {PostsScreen} from 'pages/postsList';
import {RootStackParamList} from 'shared/routes';
import {PostScreen} from 'pages/post/ui';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const Routing = () => {
  return (
    <RootStack.Navigator
      initialRouteName={'Posts'}
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: 'white'},
      }}>
      <RootStack.Screen name={'Posts'} component={PostsScreen} />
      <RootStack.Screen name={'Post'} component={PostScreen} />
    </RootStack.Navigator>
  );
};
