import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
// import { createStructuredSelector } from 'reselect';
// import { selectCollections } from '../../redux/shop/shop.selectors';
import {firestore,convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils.js';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { fetchCollectionsSuccess } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
const CollectionsOverViewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)
class ShopPage extends React.Component
{
	  state = {
      loading:true
    }
    unsubscribeFromSnapshot = null;
	  componentDidMount()
	  {
	  	   const collectionRef = firestore.collection('collections');
         this.unsubscribeFromSnapshot= collectionRef.onSnapshot(async snapshot =>{
      	  	    
      	  	   	const collectionMap = convertCollectionsSnapshotToMap(snapshot)
                 console.log('collectionMap',collectionMap['hats'])
                this.props.dispatch(fetchCollectionsSuccess(collectionMap))
                this.setState({loading:false})
          
	  	   })
	  }
       render()
       {
          const {loading} = this.state;
       	   return(

        	      <div className='shop-page'>
        	              <Route exact path={`${this.props.match.path}`} render={(props)=><CollectionsOverViewWithSpinner isLoading={loading} {...props} />} />
    					  <Route path={`${this.props.match.path}/:collectionId`} render ={(props)=><CollectionPageWithSpinner  isLoading={loading} {...props} />} />
        	      </div>
        	)
       }
}



export default  connect()(ShopPage);