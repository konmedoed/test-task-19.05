import './UserPage.sass';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchUserPostPrev} from '../store/userSlice'
import UserPostPreviewCard from '../Preview card/PreviewCard'
import { Link } from 'react-router-dom';

export default function UserPage() {
  
  const userId = useSelector(state => state.users.userIdForUserPage);
  
  const userData = useSelector(state => state.users.users[userId-1]);

  const loadPostPrev = useDispatch();
  useEffect(function(){
    loadPostPrev(fetchUserPostPrev(userId));
  },[]);

  const blockOfPosts = userData.posts.map(item => <UserPostPreviewCard title={item.title} body={item.body} key={`postCard_${item.id}`}/>)

  const dataName = userData.name.split(' ');
  let clientName = [];
  if (dataName.length>2)
    clientName = dataName.filter(item => (!item.toLowerCase().includes('mr'))&&(!item.toLowerCase().includes('ms')))
  else clientName=dataName;

  return (
    <>
      <div className='User-page'>
        <div  className='User-page_wrapper'>
          <h1 className='text-heading-large'>{userData.username}</h1>
          <p className='text-medium'>Name: {clientName[0]}</p>
          <p className='text-medium'>E-mail: {userData.email}</p>
          <p className='text-medium'>Phone: {userData.phone}</p>
          <p className='text-medium'>Website: {userData.website}</p>
          <p className='text-medium'>Company: {userData.company.name}, {userData.company.bs}</p>
          <div className='preview'>
            <div className='preview_card-wrapper'>
              {blockOfPosts}
            </div>
            <ul className='preview_link-wrapper'>
              <li className='preview_link text-medium'>
                <Link to='/posts'>...посмотреть все</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}