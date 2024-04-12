// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
	apiKey: "AIzaSyCCGYXHttLpO_j6kfjLM1btluI354QD2sg",
	authDomain: "boykisser-clicker-fb.firebaseapp.com",
	databaseURL: "https://boykisser-clicker-fb-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "boykisser-clicker-fb",
	storageBucket: "boykisser-clicker-fb.appspot.com",
	messagingSenderId: "964930676945",
	appId: "1:964930676945:web:2c3637b66d72bd4c547df0",
	measurementId: "G-NF4QJZ1XKM"
};


firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();

export { auth, db };
