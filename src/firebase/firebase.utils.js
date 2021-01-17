import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const {REACT_APP_API_KEY,REACT_APP_AUTH_DOMAIN,REACT_APP_PROJECTID,REACT_APP_STORAGE_BUCKET,REACT_APP_MESSAGING_SENDER_ID,REACT_APP_APP_ID,REACT_APP_MEASUREMENT_ID} = process.env;
// const test = `${REACT_APP_TEST_VAR}`
const config =  {
    apiKey: REACT_APP_API_KEY,
    authDomain: REACT_APP_AUTH_DOMAIN,
    projectId: REACT_APP_PROJECTID,
    storageBucket: REACT_APP_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
    appId: REACT_APP_APP_ID,
    measurementId: REACT_APP_MEASUREMENT_ID
  };

// console.log(config)
// console.log(test);
// console.log(process.env.BROWSER)
firebase.initializeApp(config);
export const createUserProfileDocument = async (userAuth, additionalData) =>
{
	if (!userAuth) return;
	// const id = 'rGwFgljnAxXXWKyQxc1l'
	const userRef = firestore.doc(`users/${userAuth.uid}`);
    console.log('UserRef',userRef)
    const snapshot  = await userRef.get();
    console.log('DocumentSnapshot',snapshot.data())
    const collectRef = firestore.collection('users')
    const collectionSnapshot  = await collectRef.get()
    console.log('CollectionSnapshot',collectionSnapshot)
    console.log('CollectionArray',collectionSnapshot.docs.map(doc =>doc.data()))
    if (!snapshot.exists)
    {
    	const { displayName, email } = userAuth;
    	const createdAt = new Date();
    	try{
              await userRef.set({
        			displayName,
			        email,
			        createdAt,
			        ...additionalData
      			});
    	}
    	catch(err)
    	{
             console.log('error creating user', err.message);
    	}
    }
    return userRef;
}
export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);


export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  // console.log(collectionRef)
      const batch = firestore.batch();
      objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef,obj)
    })
    return await batch.commit();
}  

export const convertCollectionsSnapshotToMap = collections => {
      const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

                      return {
                        routeName: encodeURI(title.toLowerCase()),
                        id: doc.id,
                        title,
                        items
                      };
          });
     return transformedCollection.reduce((accumulator,collection) =>{
          console.log('collectionItem',collection)
          accumulator[collection.title.toLowerCase()] = collection;
          console.log('accumulator',accumulator)
          return accumulator
      },{})
  }
export default firebase;