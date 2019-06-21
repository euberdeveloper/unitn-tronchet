import firebaseApp from './firebase';
import axios from 'axios';

async function init(): Promise<void> {
    const messaging = firebaseApp.messaging();
    messaging.usePublicVapidKey('BJNXnqmvcKmmXqEXCUPyLFtYhxOOvzQ4fSY2XfbUt3XCAhi8w1fZfRsy-82Mq1oiqRV29iP_kDAek_qzEB1J1p4');
    try {
        await messaging.requestPermission();
        console.log('Notification permission granted');
        const token = await messaging.getToken();
        console.log('Messaging token ', token);
        try {
            const requestResult = await axios.post('/api/register-token', { token });
            console.log(requestResult.data);

            messaging.onMessage(message => {
                console.log('New message', message);
            });
        }
        catch (error) {
            console.error(error.message, error.error);
        }
    }
    catch (error) {
        console.error('Error in initializing cloud messaging ', error);
    }
}

export function initCloudMessaging(): void {
    if (process.env.NODE_ENV === 'production') {
        init();
    }
}
