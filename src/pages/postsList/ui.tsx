import {AddPost} from 'features/addPost/ui/AddPost';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from 'shared/config/colors';
import {global} from 'shared/config/global/styles';

import {PostsList} from 'widgets/posts/ui/list';

type Props = {};

export const PostsScreen = ({}: Props) => {
  return (
    <View style={global.full}>
      <View style={styles.main}>
        <Text style={styles.title}>Task manager</Text>
      </View>
      <View style={global.full}>
        <PostsList />
      </View>
      <AddPost />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.dark,
  },
});
