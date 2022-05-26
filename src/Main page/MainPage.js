import './MainPage.sass';
import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card'

export default function MainPage() {
  const users = useSelector(state => state.users.users);
  const cards = users.map(item=><Card key={item.id} name={item.name} id={item.id}/>)
  return (
    <div className='Main-page'>
      <h1 className='text-heading-large'>Пользователи</h1>
      <div className='Main-page_user-cards-wrapper'>
        {cards}
      </div>
    </div>
  )
}