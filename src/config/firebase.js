/*
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
	apiKey: "AIzaSyCJITLuVCLA59Vt0iz5OyudJuh_IYFhu7Y",
	authDomain: "react-basics-20411.firebaseapp.com",
	projectId: "react-basics-20411",
	storageBucket: "react-basics-20411.appspot.com",
	messagingSenderId: "569050283526",
	appId: "1:569050283526:web:b6ccf2838518e51b55cd87"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();



{ // crud.js
	import { db, auth } from 'config/firebase';
	import {
		collection, doc, getDocs, getDoc, addDoc, deleteDoc, updateDoc,
		query, where, orderBy, serverTimestamp, onSnapshot
	} from 'firebase/firestore';

	const worksCollectionRef = collection(db, 'works');

	const queryWorks = async () => {
		const q = query(worksCollectionRef, where('company', '==', 'tech'), orderBy('createdAt', 'desc'));
	};

	const getWorks = async () => {
		const snapshot = await getDocs(worksCollectionRef).catch(e => console.log(e));
		const data = snapshot.docs.map(doc => ({
			...doc.data(),
			id: doc.id,
		}));

		return data;
	};

	const getWorksSubscription = (onDataChanged) => {
		onSnapshot(worksCollectionRef, snapshot => {
			onDataChanged(snapshot);
		});
	};

	const getWork = async (id) => {
		const workDocRef = doc(worksCollectionRef, id);

		const work = await getDoc(workDocRef).catch(e => console.log(e));

		return work;
	};

	const createWork = async () => {
		await addDoc(worksCollectionRef, {
			company: '',
			date: '',
			dscription: '',
			service: '',
			from: '',
			to: '',
			createdAt: serverTimestamp(),
			userId: auth?.currentUser?.uid,
		}).catch(e => console.log(e));
	};

	const deleteWork = async (id) => {
		const workDocRef = doc(worksCollectionRef, id);

		await deleteDoc(workDocRef).catch(e => console.log(e));
	};

	const updateWork = async (id) => {
		const workDocRef = doc(worksCollectionRef, id);

		await updateDoc(workDocRef, {
			company: 'updated company',
		}).catch(e => console.log(e));
	};
}

{ // auth.js
	import { auth, googleProvider } from 'config/firebase';
	import {
		createUserWithEmailAndPassword, signInWithPopup,
		signOut, signInWithEmailAndPassword, onAuthStateChanged
	} from 'firebase/auth';

	const signUp = async () => {
		const credentials = await createUserWithEmailAndPassword(auth, email, password).catch(e => console.log(e));
	};

	const signIn = async () => {
		const credentials = await signInWithEmailAndPassword(auth, email, password).catch(e => console.log(e));
	};

	const signInWithGoogle = async () => {
		await signInWithPopup(auth, googleProvider).catch(e => console.log(e));
	};

	const logout = async () => {
		await signOut(auth).catch(e => console.log(e));
	};

	const authStateChanged = async () => {
		onAuthStateChanged(auth, user => {
			console.log(user)
		});
	};

	console.log(auth?.currentUser?.email);
}
*/