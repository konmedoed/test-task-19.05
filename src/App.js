import './App.sass';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {fetchUsers} from './store/userSlice';
import {Route, Routes} from 'react-router-dom';

import MainPage from './Main page/MainPage';
import UserPage from './User page/UserPage';
import ListOfPosts from './List of posts/ListOfPosts';
import UserPost from './User post/UserPost';

export default function App() {
  const loadUsers = useDispatch();

  useEffect(function(){
    loadUsers(fetchUsers())
  },[])

  return (
    <>
      <header className='header'>
        <div className='header_wrapper'>
          <div className='header_logo text-heading-normal'>CONCERT CLUB</div>
          <div className='header_buttons-wrapper'>
            <button className='header_button-accessibility reset-button-style text-medium'>Версия для слабовидящих</button>
            <button className='header_button-profile reset-button-style text-medium'>Мой профиль</button>
          </div>
        </div>
      </header>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/user" element={<UserPage/>}/>
          <Route path="/posts" element={<ListOfPosts/>}/>
          <Route path="/user-post" element={<UserPost/>}/>
          <Route path="*" element={<MainPage/>}/>
        </Routes>
      </div>
    </>
  );
}