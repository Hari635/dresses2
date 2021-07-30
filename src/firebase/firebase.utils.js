import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const config={
    apiKey: "AIzaSyB4ThpsBYJ4jRsPRY9WDgmAbsofrBEEuGs",
    authDomain: "mycart-14154.firebaseapp.com",
    projectId: "mycart-14154",
    storageBucket: "mycart-14154.appspot.com",
    messagingSenderId: "652496924900",
    appId: "1:652496924900:web:65d5576a3b54a456197cf1",
    measurementId: "G-0CS87BM3RG"
  }

  export const createUserProfileDocument=async(userAuth,additionalData)=>{
      if(!userAuth){
        return
      } 
      // the below useRef it will querry refrence it will give refrence even the userAuth.uid is not present
      const userRef =firestore.doc(`user/${userAuth.uid}`)
      const snapShot=await userRef.get()
      // the above snapShot method gives and it will give exist property
      // this exists property tell whether userAuth.uid is present in the database

      if(!snapShot.exists){
          
          const{ displayName,email}=userAuth
          const createdAt=new Date()
          //this try block create user in the database

          try{
              await userRef.set({
                  displayName,
                  email,
                  createdAt,
                  ...additionalData

              })
          }catch(error){
              console.log('error creating user',error.message);

          }
      }
      return(userRef)
  }
 
  export const addCollectionAndDocuments=async(collectionKey,objectsToAdd)=>{
      const collectionRef=firestore.collection(collectionKey)
    //   console.log("collection Refrernce");
    //   console.log(collectionRef);
    // the below batch is used in case if you got network issue or net cut the data upload half the data in firestore remaining are not stored for that issue we used batch 
    const batchs=firestore.batch()
    objectsToAdd.forEach(obj=>{
        const newDocRef=collectionRef.doc()
        // console.log("newDocRef");
        // console.log("obj");
        // console.log(obj);
        batchs.set(newDocRef,obj)
    })

    return await batchs.commit();

  }
  //the above is the method is used to add the collection to firestore database 
  export const convertCollectionsSnapshotToMap=(collections)=>{
    const transformedCollection=collections.docs.map((doc)=>{
      const {title,items}=doc.data();
      return{
        routeName:encodeURI(title.toLowerCase()),
        id:doc.id,
        title,
        items
      }

    })
    return transformedCollection.reduce((accumulator,collection)=>{
      accumulator[collection.title.toLowerCase()]=collection;
      return accumulator;
    },{})
    //the above code for convert array into object 
  }
  

  firebase.initializeApp(config)

 

  export const auth=firebase.auth()
  export const firestore=firebase.firestore()


  const provider =new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({prompt:'select_account'})
  export const signInWithGoogle=()=>auth.signInWithPopup(provider)
  //the above line is used to sign in with google

  export default firebase

  // i got error in firestore which i could not sign in i resolve by change the rules in firestore
  //https://github.com/actions-on-google/smart-home-nodejs/issues/369