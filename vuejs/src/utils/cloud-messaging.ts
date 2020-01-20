import axios from 'axios';
import firebaseApp from './firebase';

async function init(): Promise<void> {
    const messaging = firebaseApp.messaging();
    // Do not mess up with this
    messaging.usePublicVapidKey('BJNXnqmvcKmmXqEXCUPyLFtYhxOOvzQ4fSY2XfbUt3XCAhi8w1fZfRsy-82Mq1oiqRV29iP_kDAek_qzEB1J1p4');
    try {
        await messaging.requestPermission();
        console.debug('Notification permission granted');
        const token = await messaging.getToken();
        console.debug('Messaging token ', token);
        try {
            const requestResult = await axios.post('/api/register-token', { token });
            console.debug(requestResult.data);

            messaging.onMessage(message => {
                console.debug('New message', message);
            });
        }
        catch (error) {
            console.error('Cloud Messaging Error: ' + error.message, error.error);
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
