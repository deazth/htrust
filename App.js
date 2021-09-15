import React from 'react';
import { BaseTheme } from './src/theme';
import { BaseContainer } from './src/components/styles';
import { RootStack } from './src/navigators/rootNavigator';
import { NativeBaseProvider } from 'native-base';
import config from './nativebase.config';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/app/store'
import { Provider } from 'react-redux'

export default function App() {

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={BaseTheme} config={config}>
        <NavigationContainer>
          <BaseContainer>
            <RootStack /> 
          </BaseContainer>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}