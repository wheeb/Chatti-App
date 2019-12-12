import firebase from 'firebase'; // 4.8.1

class Fire {
    constructor() {
        this.init();
        this.observeAuth();
    }

    init = () => {
        //dont init if inited already. stops accidental non-wanted inits
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyB5O3kj9YcPezvKJ25VAL9aYNuXspLomLo",
                authDomain: "chatti-e614f.firebaseapp.com",
                databaseURL: "https://chatti-e614f.firebaseio.com",
                projectId: "chatti-e614f",
                storageBucket: "chatti-e614f.appspot.com",
                messagingSenderId: "1057452666637",
                appId: "1:1057452666637:web:f530411f622cb1aa72ca44"
            });
        }
    };


    //if signed in before. return user
    observeAuth = () =>
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

    onAuthStateChanged = user => {
        if (!user) {
            try {
                firebase.auth().signInAnonymously();
            } catch ({ message }) {
                alert(message);
            }
        }
    };
    //helper to get uid
    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
    //get firebase database save location
    get ref() {
        return firebase.database().ref('messages');
    }

    parse = snapshot => {
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: _id } = snapshot;
        const timestamp = new Date(numberStamp);
        const message = {
            _id,
            timestamp,
            text,
            user,
        };
        return message;
    };


    //callback prop calls messages and gets 20 last messages
    on = callback =>
        this.ref
            .limitToLast(20)
            .on('child_added', snapshot => callback(this.parse(snapshot)));

    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }
    // send the message
    send = messages => {
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i];
            const message = {
                text,
                user,
                timestamp: this.timestamp,
            };
            console.log(message);
            this.append(message);
        }
    };


    append = message => this.ref.push(message);

    // unsubscibe database
    off() {
        this.ref.off();
    }
}

Fire.shared = new Fire();
export default Fire;