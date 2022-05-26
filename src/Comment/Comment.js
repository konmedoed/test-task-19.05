import './Comment.sass';
import React from 'react';

export  function Comment({name, email, body}) {

    return (
        <div className='Comment'>
            <h4 className='text-bold'>{name}</h4>
            <p className='text-small'>email: {email}</p>
            <p className='text-medium'>{body}</p>
        </div>
    )
}