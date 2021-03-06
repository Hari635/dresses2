import React from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsForPreview } from "../../redux/shop/shop.selector";
import CollectionPreview from "../collection-preview/collection-preview";

const CollectionsOverview=({ collections })=>{
    return(
        <div>
        {
            collections.map(({id,...otherCollectionProps})=>{
                return(
                    <CollectionPreview key={id} {...otherCollectionProps} />
                )
            })
        }
    </div>
    )
}

const mapStateToProps=createStructuredSelector({
    collections:selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionsOverview)

