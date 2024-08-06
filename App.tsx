import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Main} from 'app';

import {StatusBar, useColorScheme} from 'react-native';
import {global} from 'shared/config/global/styles';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={global.full}>
      <NavigationContainer>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Main />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;

/**
 * пришлось переделать логику по флоу
 * когда разрабатывал локальным сервером работали ответы отлично
 * но как только подключил удаленный сервер
 * ответы на POST {id}, PUT - {}, DELETE - {}
 * изменил на получения данных которые зашли в санку
 */
