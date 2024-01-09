import firebase from '../firebase';

export const getUserData = (user, setUser) => {
    if (user != null)
    {
        try {
            firebase
            .firestore()
            .collection('users')
            .where('uid', '==', user.uid)
            .get()
            .then((userData) => setUser(userData.docs[0].data()))
        } catch(error) {
            console.log(error)
        }
    }
}