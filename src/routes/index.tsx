import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';
import { useEffect, useState } from 'react';
import OneSignal, {
  NotificationReceivedEvent,
  OSNotification
} from 'react-native-onesignal';
import { Notification } from '../components/Notification';

const linking = {
  prefixes: [
    'com.igniteshoes://',
    'exp+igniteshoesapp://',
    'igniteshoesapp://'
  ],
  config: {
    screens: {
      details: {
        path: 'details/:productId',
        parse: {
          productId: (productId: string) => productId
        }
      }
    }
  }
};

export function Routes() {
  const [notification, setNotification] = useState<
    OSNotification | undefined
  >();
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];
  const productId = '7';

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent: NotificationReceivedEvent) => {
        const response = notificationReceivedEvent.getNotification();
        setNotification(response);
      }
    );
    return () => unsubscribe;
  }, []);

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />
      {notification?.title && (
        <Notification
          data={notification}
          onClose={() => {
            setNotification(undefined);
          }}
        />
      )}
    </NavigationContainer>
  );
}
