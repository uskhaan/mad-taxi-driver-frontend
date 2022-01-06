import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';
import HomeScreen from '../screens/HomeScreen/index';
import Router from './Root';
import {NotificationScreen} from '../screens/NotificationScreen.js';

const Stack = createStackNavigator();

const MainContainer = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={'Login'} component={Login} />
        <Stack.Screen name={'Signup'} component={Signup} />
        <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
        <Stack.Screen
          name={'NotificationScreen'}
          component={NotificationScreen}
        />
        {/* <Stack.Screen name={'Router'} component={Router} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainContainer;
