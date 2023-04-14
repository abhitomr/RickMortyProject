import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from '../screens/ListScreen';
import DetailScreen from '../screens/DetailScreen';

const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={ListScreen} options={{ headerShown:false}}/>
      <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown:false}}/>
    </Stack.Navigator>
  );
}