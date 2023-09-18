import { LogBox, StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import OneSignal from 'react-native-onesignal';

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';
import { ONESIGNAL_APP_ID } from './src/config';
import { useEffect } from 'react';
OneSignal.setLogLevel(6, 0);

OneSignal.setAppId(ONESIGNAL_APP_ID);

OneSignal.promptForPushNotificationsWithUserResponse();

/* Versão 5.0 do react-native-onesignal */
// async function init() {
//   OneSignal.Debug.setLogLevel(LogLevel.Verbose);
//   OneSignal.initialize(ONESIGNAL_APP_ID);
//   await OneSignal.Notifications.requestPermission(true);
// }
// init();

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  //Remover esse effect quando o native-base remover o SSRProvider na nova versão
  useEffect(() => {
    LogBox.ignoreLogs([
      'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.'
    ]);
  }, []);

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationOpenedHandler((response) => {
      // console.log('OneSignal: notification opened:', response);
      const { actionId } = response.action as any;

      switch (actionId) {
        case '1':
          console.log('Ver todas');
          break;
        case '2':
          console.log('Ver Pedido');
          break;
        default:
          console.log('Não foi clicado em botão de ação');
      }
    });
    return () => unsubscribe;
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}
