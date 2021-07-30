
import './App.css';
import React from 'react'
import HomePage from './pages/homepage.component'
import { Switch,Route,Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ShopPage from './pages/shop.components'
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up.component";
import { auth,createUserProfileDocument,addCollectionAndDocuments } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.action";
import { selectCurrentUser } from "./redux/user/user.selector";
import { createStructuredSelector } from "reselect";
import  CheckoutPage  from "./pages/checkout.component";
import { selectCollectionsForPreview } from "./redux/shop/shop.selector";

class App extends React.Component{
  // constructor(){
  //   super()
  //   this.state={
  //     currentUser:null
  //   }
  // }
unsubscribeFromAuth=null
  componentDidMount(){
    const { setCurrentUser }=this.props
    this.unsubscribeFromAuth=auth.onAuthStateChanged(async (userAuth)=>{
      if(userAuth){
        // the below createuserProfileDocument function is used to create the user in firestore database 
        //in firebase if you create user it automatically stored the user in Authentication section
        // not in the fire tore database
        // for this purpose we can create  this below function
        const userRef=await createUserProfileDocument(userAuth)
        //the below onshapshot finction gives all data that are stored in database of the particular user is given
        //snapshot.data() is only give the data of the user in the database 
        //snapshot only gives the id etc
        userRef.onSnapshot(snapshot=>{
        setCurrentUser({
              id:snapshot.id,
              ...snapshot.data()
            })
          })
          //onSnapshot change listerner is used to when the userRef is change it will trigger that function
          // console.log(this.state);
        
      }
      setCurrentUser(userAuth)
      // const newArray=collectionArray.map(({title,items})=>({title,items}))
      // console.log("new Array");
      // console.log(newArray);

      // addCollectionAndDocuments('collections',newArray) 
      //we are calling the addCollection function with collections as key anf collectionArray as the argument

    })

  }

  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }
  render(){
    return (
      <div className="App">
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact  path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={()=>this.props.currentUser?(<Redirect to='/'/>):(<SignInAndSignUpPage/>)}/>
        </Switch>
      </div>
    );

  }
  
}

const mapStateToProps=createStructuredSelector(
  {
    currentUser:selectCurrentUser,
    // collectionArray:selectCollectionsForPreview
  }
)
const mapDispatchToprops=(dispatch)=>{
  return{
    setCurrentUser:(user)=>dispatch(setCurrentUser(user))
  }
}
//mapDispatchToprops function gives the redux to dispatch setCurrentUser function to components

export default connect(mapStateToProps,mapDispatchToprops)(App);
