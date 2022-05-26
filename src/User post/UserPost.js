import './UserPost.sass';
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import {fetchPostComments} from '../store/userSlice';
import {Comment} from '../Comment/Comment';
import {Form} from '../Form/Form'


export default function UserPost() {
  const [formVisibility, setFormVisibility] = useState('invisible');
  const [formOpenButtonVisibility, setFormOpenButtonVisibility] = useState('visible');
  const userId = useSelector(state=>state.users.userIdForUserPage);
  const userIndexArray = userId-1;

  const userPostId = useSelector(state=>state.users.postIdForFetch);

  const userPostData = useSelector(state=>state.users.users[userIndexArray].posts.find(item=>item.id===userPostId));

  const loadData = useDispatch();
  useEffect(function(){
    loadData(fetchPostComments(userPostId));
  },[])

  let componentsOfComments = [];

  if (userPostData.comments.length===0){
      return (<h1 className='text-heading-large'>загрузка...</h1>)
    }
    else {
      componentsOfComments = userPostData.comments.map(item=> <Comment key={`comment_${item.id}`} name={item.name} email={item.email} body={item.body}/>)
    }

  return (
    <div className='User-post'>
      <div className='User-post_wrapper'>
        <div className='User-post_body'>
          <h1 className='User-post_heading text-heading-large'>{userPostData.title}</h1>
          <p className='text-medium'>{userPostData.body}</p>
        </div>
        <div className='User-post_comments'>
          {componentsOfComments}
        </div>
        <div className={formVisibility}>
          <Form/>
        </div>
        <div className={formOpenButtonVisibility}>
          <button className='User-post_button reset-button-style text-medium' onClick={()=>{setFormVisibility('visible'); setFormOpenButtonVisibility('invisible')}}>Оставить комментарий</button>
        </div>
      </div>
    </div>
      
  )
}