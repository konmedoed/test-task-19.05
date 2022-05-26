import './UserPostPreviewCard.sass';
import React from 'react';
import {takePostIdForFetch} from '../store/userSlice'
import { useDispatch } from 'react-redux';


export default function UserPostPreviewCard({title, body, myKey=null}) {
  const dispatch = useDispatch();

  return (
    <div className='preview-card' onClick={()=>{
      if (myKey!=null)
        {dispatch(takePostIdForFetch(myKey))}
    }}>
      <h3 className='text-bold'>{title}</h3>
      <p className='preview-card_text text-small'>{body}</p>
    </div>
  )
}