import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {
  label: string;
  body?: string;
};

export const InfoSection = ({label, body = ''}: Props) => {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.label}>{label}</Text>
      {body && <Text style={styles.text}>{body}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  infoBox: {},
  label: {
    fontSize: 12,
    fontWeight: '700',
    opacity: 0.5,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
});
