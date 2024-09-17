import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screen/HomeScreen';
import FavoritesScreen from '../screen/FavoritesScreen';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'All Users', headerShown: false } } />
        <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favorite Users' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
