import * as firebase from 'firebase';

class Fire {


    constructor() {
        //initialize database call
        this.init();
        //auth call
        this.observeAuth();
    }

    init = () =>
        firebase.initializeApp({
            apiKey: 'AIzaSyB5O3kj9YcPezvKJ25VAL9aYNuXspLomLo',
            authDomain: "chatti-e614f.firebaseapp.com",
            databaseURL: "https://chatti-e614f.firebaseio.com",
            projectId: "chatti-e614f",
            storageBucket: "chatti-e614f.appspot.com",
            messagingSenderId: "1057452666637",
            appId: "1:1057452666637:web:804884db34d5393372ca44"
        });

    observeAuth = () =>
      firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
    //auth call when firebase find auth
    onAuthStateChanged = user => {
        if (!user) {
            try {
                //try to sign in anonymously. If fail, send error
                firebase.auth().signInAnonymously();
            } catch ({message}) {
                alert(message)

            }
        }
    };
    //reference location where messages will be saved
    get ref() {
        return firebase.database().ref('messages');
    }
    //calls 20 last messages
    on = callback =>
        this.ref
            .limitToLast(20)
            .on('child_added', snapshot => callback(this.parse(snapshot)));

    parse = snapshot => {

        const {timestamp: numberStamp, text, user} = snapshot.val();
        const {key: _id} = snapshot;
        const timestamp = new  Date (numberStamp);

        const message = { _id, timestamp, text, user,};
        return message;
    };



    //unsubscribe database
    off() {
        this.ref.off();
    }
    //helper for getting user id
    get uid(){
        return (firebase.auth().currentUser || {}).uid;
    }
    //accurate timesStamp for messages
    get timestamp(){
        return firebase.database.ServerValue.TIMESTAMP;
    }

    send = messages => {
        for (let i = 0; i < messages.length; i++){
            const { text, user} = messages[i];
            const message = {
                text, user, timestamp: this.timestamp,
            };
            this.append(message);
        }
    };
    append = message = this.ref.push(message);





}
Fire.shared = new Fire();
export default Fire;
