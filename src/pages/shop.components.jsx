import React from 'react'
import CollectionsOverview from '../components/collections-overview/collections-overview.components'
import { Route } from "react-router-dom";
import CollectionPage from "./collection.component";
import {connect} from "react-redux";
import WithSpinner from "../components/with-spinner/with-spinner.components";
import { firestore,convertCollectionsSnapshotToMap } from '../firebase/firebase.utils';
import { updateCollections } from '../redux/shop/shop.actions';
//  class ShopPage extends React.Component{
// similar comment in directory components checkout directory components
//      constructor(props){
//          super(props)
//          this.state={
//              collections:SHOP_DATA
//          }
//      }

//      render(){
//          const {collections}=this.state
const CollectionsOverviewWithSpinner=WithSpinner(CollectionsOverview)
const CollectionsPageWithSpinner=WithSpinner(CollectionPage)

class ShopPage extends React.Component{
    state={
        loading:true
    }
    unsubscribeFromSnapshot=null;
    componentDidMount(){
        const {updateCollections}=this.props
        const collectionRef=firestore.collection('collections')
        collectionRef.onSnapshot(async(snapshot)=>{
          const collectionsMap=convertCollectionsSnapshotToMap(snapshot)
        //   console.log(collectionsMap);
        updateCollections(collectionsMap)
        this.setState({loading:false})
        }) 
    }
    render(){
        const { match }=this.props
        const {loading}=this.state;
         return(
             <div>
                 <Route exact path={`${match.path}`} render={(props)=><CollectionsOverviewWithSpinner isLoading={loading} {...props} />}  />
                 <Route exact path={`${match.path}/:collectionId`} render={(props)=><CollectionsPageWithSpinner isLoading={loading} {...props} />}  />
                 {/* the above route is nested route which is nested inside the app.js route */}
             </div>
         )
    }
     }

     const mapDispatchToProps = dispatch=>({
         updateCollections:collectionsMap=>dispatch(updateCollections(collectionsMap))
     })

 export default connect(null,mapDispatchToProps)(ShopPage)