import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MyStack from './MyStack';

export default function Main() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}