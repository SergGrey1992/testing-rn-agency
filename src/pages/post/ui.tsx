import {AddComment} from 'features/addComment/ui/AddComment';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ScreenProps} from 'shared/routes';
import {Header, InfoSection} from 'shared/ui';
import {CommentsList} from 'widgets/comments/ui/list';

type Props = {} & ScreenProps<'Post'>;

export const PostScreen = ({route}: Props) => {
  const {title, body, id} = route.params;

  return (
    <View style={styles.container}>
      <Header title={title} />
      <InfoSection label={'Description:'} body={body} />
      <CommentsList id={id} />
      <AddComment postId={id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
