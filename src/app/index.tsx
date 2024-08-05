import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import {Routing} from './routes';
import {composeProviders, createProvider} from './providers';
import {store} from './store';

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

type Props = {};

const providers = [
  createProvider(SafeAreaProvider),
  createProvider(Provider, {store}),
  createProvider(BottomSheetModalProvider),
];

const AllInOneProvider = composeProviders(providers);

export const Main = ({}: Props) => {
  return (
    <AllInOneProvider>
      <SafeAreaView style={styles.container}>
        <Routing />
      </SafeAreaView>
    </AllInOneProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
