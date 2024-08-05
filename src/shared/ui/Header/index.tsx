import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from '../Button';
import {global} from 'shared/config/global/styles';
import {useNavigation} from '@react-navigation/native';

type Props = {
  title: string;
};

export const Header = ({title}: Props) => {
  const {goBack} = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.goBack}>
        <Button leftIcon={'arrowRight'} onPress={goBack} />
      </View>
      <View>
        <Text style={global.title}>{title}</Text>
      </View>
      <View style={styles.empty} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  empty: {
    width: 28,
    height: 28,
  },
  goBack: {
    transform: [{rotate: '180deg'}],
  },
});
