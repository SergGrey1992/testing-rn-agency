import {useAppDispatch, useAppSelector} from 'app/store';
import {
  fetchComment,
  getAllComments,
  resetComments,
  CommentType,
  removeComment,
} from 'entities/comments/model';
import React, {useCallback, useEffect} from 'react';
import {View, StyleSheet, ListRenderItem} from 'react-native';
import {FlatList} from 'react-native';
import {InfoSection} from 'shared/ui';

import {Comment} from './comment';
import {Empty} from './empty';

type Props = {
  id: number;
};

export const CommentsList = ({id}: Props) => {
  const dispatch = useAppDispatch();

  const allComments = useAppSelector(getAllComments);

  useEffect(() => {
    dispatch(fetchComment({id}));
    return () => {
      dispatch(resetComments());
    };
  }, [dispatch, id]);

  const removeCommentAction = useCallback(
    (_id: number) => {
      dispatch(removeComment({id: _id}));
    },
    [dispatch],
  );

  const render: ListRenderItem<CommentType> = ({item}) => {
    return <Comment {...item} removeAction={removeCommentAction} />;
  };

  return (
    <View style={styles.container}>
      <InfoSection label={'Comments:'} />
      <View style={styles.listWrapper}>
        <FlatList
          data={allComments}
          renderItem={render}
          contentContainerStyle={styles.listWrapper}
          keyExtractor={({id: _id, postId}) => `${_id}_${postId}`}
          ListEmptyComponent={Empty}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listWrapper: {
    flexGrow: 1,
    gap: 8,
  },
});
