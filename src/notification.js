import * as Notifications from 'expo-notifications';

export async function registerPushNotification(setNotification = () => { }) {
    let token = null;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return null;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;

    Notifications.addNotificationReceivedListener(notification => {
        console.log('newNotiş',notification)
        setNotification(notification);
    });

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}