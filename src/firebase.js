import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCJITLuVCLA59Vt0iz5OyudJuh_IYFhu7Y",
	authDomain: "react-basics-20411.firebaseapp.com",
	projectId: "react-basics-20411",
	storageBucket: "react-basics-20411.appspot.com",
	messagingSenderId: "569050283526",
	appId: "1:569050283526:web:b6ccf2838518e51b55cd87"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;