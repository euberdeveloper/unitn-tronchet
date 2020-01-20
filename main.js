const path = require('path');
const compression = require('compression')
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');

const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;
const DIST_FOLDER = path.join(__dirname, 'frontend');

const redirect = require('./utilities/redirect');

const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('./utilities/firebase-credentials')();
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://unitn-tronchet.firebaseio.com"
});
const firebaseMessaging = firebaseAdmin.messaging();
const PUBLIC_TOPIC = "public";

app.use(compression());
if (process.env.NODE_ENV === 'production') {
    app.use(redirect);
}

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(morgan('dev'));

app.use(history());
app.use(express.static(DIST_FOLDER));

app.post('/api/register-token', (req, res) => {
    const { token } = req.body;
    firebaseMessaging.subscribeToTopic(token, PUBLIC_TOPIC)
        .then(_ => res.status(200).send({ success: 'Token added succesfully to the topic'} ))
        .catch(error => res.status(500).send({ message: 'Error in adding token to the topic', error }));
});

app.listen(PORT, () => {
    console.log('PORT ', PORT);
    console.log('SERVER LISTENING');
});