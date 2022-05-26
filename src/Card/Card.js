import './Card.sass';
import React from 'react';
import { useDispatch } from 'react-redux';
import {takeUserIdForUserPage} from '../store/userSlice'
import {Link } from 'react-router-dom';

export default function Card({name, id}) {
    const dispatch = useDispatch();
    const sendIdToState = () => dispatch(takeUserIdForUserPage(id));

    const propsUserName = name.split(' ');
    let userName = [];
    if (propsUserName.length>2)
        userName = propsUserName.filter(item => (!item.toLowerCase().includes('mr'))&&(!item.toLowerCase().includes('ms')))
    else userName=propsUserName;

    return (
        <div className='card' onClick={sendIdToState}>
            <p className='card_name'>{userName[0]} {userName[1]}</p>
            <ul  className='card_link-wrapper'>
                <Link to='/user' >
                    <li className='card_link text-medium'>Смотреть профиль</li>
                </Link>
            </ul>
        </div>
    )
}