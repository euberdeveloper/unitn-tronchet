import firebase from 'firebase';

// Do not mess up with this
const config = {
    apiKey: 'AIzaSyDiv4wmKQfkxqT4nt3BLf9XGC1lIxWMias',
    authDomain: 'unitn-tronchet.firebaseapp.com',
    databaseURL: 'https://unitn-tronchet.firebaseio.com',
    projectId: 'unitn-tronchet',
    storageBucket: 'unitn-tronchet.appspot.com',
    messagingSenderId: '507166536810',
    appId: '1:507166536810:web:c7ad30bbc2141c54'
};

export default firebase.initializeApp(config);
