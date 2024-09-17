import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

type UserItemProps = {
  user: User;
  isFavorite: boolean;
  onToggleFavorite: (user: User) => void;
};

const UserItem: React.FC<UserItemProps> = ({ user, isFavorite, onToggleFavorite }) => {
  return (
    <View style={styles.item}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <View style={styles.info}>
        <Text>{user.first_name} {user.last_name}</Text>
        <Text>{user.email}</Text>
      </View>
      <TouchableOpacity onPress={() => onToggleFavorite(user)}>
        <Text style={styles.icon}>{isFavorite ? '★' : '☆'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  icon: {
    fontSize: 24,
    color: 'gold',
  },
});

export default UserItem;
