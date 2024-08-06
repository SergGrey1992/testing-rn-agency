import {useAppDispatch, useAppSelector} from 'app/store';
import {
  editTask,
  fetchPosts,
  getAllPosts,
  Post,
  removeTask,
} from 'entities/model';

import React, {useCallback, useEffect} from 'react';
import {View, StyleSheet, ListRenderItem} from 'react-native';
import {PostItem} from './post';
import {global} from 'shared/config/global/styles';
import {fetchProfile} from 'entities/porfile/model';
import Animated, {LinearTransition} from 'react-native-reanimated';
import {FormValues} from 'features/addPost/ui/AddPostForm';

type Props = {};

export const PostsList = ({}: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchProfile());
  }, [dispatch]);

  const dataPosts = useAppSelector(getAllPosts);

  const remove = useCallback(
    (id: string) => {
      dispatch(removeTask(id));
    },
    [dispatch],
  );

  const submit = useCallback(
    (id: string, data: FormValues) => {
      dispatch(editTask({id, data}));
    },
    [dispatch],
  );

  const render: ListRenderItem<Post> = ({item}) => {
    return <PostItem {...item} removeAction={remove} submitAction={submit} />;
  };

  return (
    <View style={global.full}>
      <Animated.FlatList
        data={dataPosts}
        renderItem={render}
        keyExtractor={({id}) => id.toString()}
        contentContainerStyle={styles.content}
        itemLayoutAnimation={LinearTransition}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    gap: 24,
    paddingHorizontal: 24,
  },
});
