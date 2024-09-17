import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import UserItem from '../component/UserItem';
import { fetchUsers } from '../services/api';

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

const HomeScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [favorites, setFavorites] = useState<User[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    getUsers();
    loadFavorites();
  }, []);

  useFocusEffect(() => {
    loadFavorites();
  });

  const getUsers = async () => {
    try {
      const data = await fetchUsers(2);
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadFavorites = async () => {
    try {
      const favs = await AsyncStorage.getItem('favorites');
      if (favs !== null) {
        setFavorites(JSON.parse(favs));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFavorite = async (user: User) => {
    let updatedFavorites: User[];
    if (favorites.some(fav => fav.id === user.id)) {
      updatedFavorites = favorites.filter(fav => fav.id !== user.id);
    } else {
      updatedFavorites = [...favorites, user];
    }
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Users</Text>
      <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate('Favorites')}><Text style={{color: 'white'}}>{'Favorites User'}</Text></TouchableOpacity>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserItem
            user={item}
            isFavorite={favorites.some(fav => fav.id === item.id)}
            onToggleFavorite={toggleFavorite}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginVertical: 10,
  },
  btn: {
     justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'blue',
    borderRadius: 20
  }
});

export default HomeScreen;
