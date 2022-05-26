import './Form.sass';
import React from 'react';
import { useForm } from 'react-hook-form';
import {fetchNewComment} from '../store/userSlice'
import { useDispatch, useSelector } from 'react-redux';

export function Form() {
    
    const dispatch = useDispatch();
    const postId = useSelector(state=>state.users.postIdForFetch);

    const {
        register, 
        handleSubmit,
        //formState: {errors}
    } = useForm();

    const onSubmit = (data) => {
        dispatch(fetchNewComment({data:data, postId:postId}));
    };

    return (
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <p className='text-bold'>Имя:<br/>
                <input className='form_input text-medium' placeholder='имя' {...register('name', {required: true, maxLength: 60})}/>
            </p>
            <p className='text-bold'>E-mail:<br/>
                <input className='form_input text-medium' placeholder='email' {...register('email', {required: true, pattern: /^\S+@\S+$/i})}/>
            </p>
            <p className='text-bold'>Введите текст:<br/>
                <textarea className='form_comment text-medium' {...register('body', {required: true})}></textarea>
            </p>

            <input className='form_submit  text-medium' type='submit' value={'отправить/send'}/>
        </form>
    )
}