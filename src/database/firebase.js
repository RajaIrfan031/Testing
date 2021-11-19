import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCkrGz1JO9QeSR322itrnZK0NRtC8p3ssM",
    databaseURL: "https://grdnagentapp.firebaseio.com",
    storageBucket: "grdnagentapp.appspot.com",
    authDomain: "grdnagentapp.firebaseapp.com",
    projectId: "grdnagentapp",
    messagingSenderId: "806712103529",
    appId: "1:806712103529:ios:0216a1aeb6092e246b08f8"

};

firebase.initializeApp(firebaseConfig);

export default firebase;

