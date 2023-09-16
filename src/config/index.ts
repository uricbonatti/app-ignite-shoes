import { Platform } from 'react-native';
import {
  EXPO_PUBLIC_ONESIGNAL_APP_ID_ANDROID,
  EXPO_PUBLIC_ONESIGNAL_APP_ID_IOS
} from '@env';

const ONESIGNAL_APP_ID_ANDROID = EXPO_PUBLIC_ONESIGNAL_APP_ID_ANDROID || '';
const ONESIGNAL_APP_ID_IOS = EXPO_PUBLIC_ONESIGNAL_APP_ID_IOS || '';

const ONESIGNAL_APP_ID = (function () {
  return Platform.OS === 'ios'
    ? ONESIGNAL_APP_ID_IOS
    : ONESIGNAL_APP_ID_ANDROID;
})();

export { ONESIGNAL_APP_ID };

//not working
