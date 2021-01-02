import React from 'react';
import { connect } from 'react-redux';
import './collection.styles.scss';
 import { selectCollection } from '../../redux/shop/shop.selectors';

const CollectionPage = ({collection}) => {
  console.log(collection)
  return (
    <div className='collection-page'>
      <h2 className='title'></h2>
      <div className='items'>
            COLLECTION PAGE
      </div>
    </div>
  );
};
const mapStateToProps =(state,ownProps)=>
{
	return({
          collection : selectCollection(ownProps.match.params.collectionId)(state)
	})
}
export default connect(mapStateToProps,null)(CollectionPage);