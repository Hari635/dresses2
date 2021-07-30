import { createSelector } from "reselect";
// the below object is used for map the url into id
//for example our router gives .../shop/hat is string but our dummy data has only id is number 
//for that we used the object to map string to id
const COLLECTION_ID_MAP={
    hats:1,
    sneakers:2,
    jackets:3,
    womens:4,
    mens:5
}

const selectShop=(state)=>state.shop;

export const selectCollections=createSelector(
    [selectShop],
    (shop)=>shop.collections

)

export const selectCollectionsForPreview=createSelector(
    [selectCollections],
    (collections)=>collections ? Object.keys(collections).map(key=>collections[key]):[]
    //the above keys function is js function it used to convert all keys into an array and in that array map the function
    //key to object
)

//we can pass argument in selector
export const selectCollection =(collectionUrlParam)=>createSelector(
        [selectCollections],
        (collections)=>(collections ? collections[collectionUrlParam]:null))
        
        