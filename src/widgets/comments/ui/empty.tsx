import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {};

export const Empty = ({}: Props) => {
  return (
    <View style={styles.container}>
      <Text>No comments at the moment</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
