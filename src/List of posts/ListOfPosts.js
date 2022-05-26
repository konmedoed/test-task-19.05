import './ListOfPosts.sass';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchUserPosts} from '../store/userSlice'
import UserPostPreviewCard from '../Preview card/PreviewCard';
import { Link } from 'react-router-dom';

export default function ListOfPosts() {
  
  const userId = useSelector(state => state.users.userIdForUserPage);
  const userData = useSelector(state => state.users.users[userId-1]);

  const loadData = useDispatch();
  useEffect(function(){
    loadData(fetchUserPosts(userId))
  },[])
  
  const posts = userData.posts.map(item => 
  <Link to='/user-post' key={`link${item.id}`}>
    <UserPostPreviewCard title={item.title} body={item.body} key={`postCard${item.id}`} myKey={item.id}/>
  </Link>
  )

  return (
    <div className='page-of-posts'>
      <div className='page-of-posts_content-wrapper'>
        <h1 className='text-heading-large'>Посты</h1>
        <div className='page-of-posts_list-wrapper' >
          {posts}
        </div>
      </div>
    </div>
  )
}