import React from 'react'
import { useDispatch } from 'react-redux';


/**
 * @param {{ 
 * id: any; 
 * title: any; 
 * description: any; 
 * cover_picture: any; 
 * author_name: any; 
 * category_name: any; 
 * price: any; 
 * addToFavorates: any; 
 * removeFromFavorates: any; 
 * isFavorate: any; 
 * }} props
 */
export default function Book_Card(props) {

    const {id,title,description,cover_picture,author_name,category_name,price,addToFavorates,removeFromFavorates,isFavorate} = props

    const dispatch = new useDispatch();

  return (
    <div className='BookCard' >
        <img src={`${cover_picture}`} alt="" />
        <span className='Book_Description'>
          {description}
        </span>
        <div>
          <div>
            <p>title :</p><h3>{`${title}`}</h3>
          </div>
          <div>
            <p>author :</p><p>{author_name}</p>

          </div>
          <div>
            <p>category :</p><p>{category_name}</p>

          </div>
          <div>
            <p>price :</p><p>{price}</p>

          </div>
          {
            isFavorate?
              <button onClick={
                ()=>{
                  dispatch(removeFromFavorates(id))
                }
              }
              >Remove from favorates</button>
              : 
              <button onClick={()=>{

                dispatch(addToFavorates(id))
              }}
              >Add to favorates</button>
          }
        </div>
      </div>
  )
}
