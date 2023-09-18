import OneSignal from 'react-native-onesignal';

export function tagUserEmailCreate(email: string) {
  OneSignal.sendTag('userEmail', email);

  /* rno 5.0*/
  // OneSignal.User.addTag('userEmail', email);
}

export function tagUserEmailDelete() {
  OneSignal.deleteTag('userEmail');

  /* rno 5.0*/
  // OneSignal.User.removeTag('userEmail');
}

export function tagUserInfoCreate(name: string, email: string) {
  OneSignal.sendTags({
    user_name: name,
    user_email: email
  });

  /* rno 5.0*/
  // OneSignal.User.addTags({
  //   user_name: name,
  //   user_email: email
  // });
}

export function tagCartUpdate(itemsCount: string) {
  OneSignal.sendTag('cart_items_count', itemsCount);
}
