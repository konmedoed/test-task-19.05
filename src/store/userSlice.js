import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async function (){
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        return data;
    }
);

export const fetchUserPostPrev = createAsyncThunk(
    'users/fetchUserPostPrev',
    async function (id){
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}&_limit=3`);
        const data = await response.json();
        return data;
    }
);

export const fetchUserPosts = createAsyncThunk(
    'users/fetchUserPosts',
    async function (id){
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
        const data = await response.json();
        return data;
    }
);

export const fetchPostComments = createAsyncThunk(
    'users/fetchPostComments',
    async function (postId){
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        const data = await response.json();
        return data;
    }
);

export const fetchNewComment = createAsyncThunk(
    'users/fetchNewComment',
    async function (data){
        let url=`https://jsonplaceholder.typicode.com/posts/${data.postId}/comments`;
        const response = await fetch(url,{
            method: 'POST',
            body: JSON.stringify(data.data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const serverResponce = await response.json();
        return serverResponce;
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState:{
        users: [],
        userIdForUserPage: null,
        postIdForFetch: null
    },
    reducers:{
        takeUserIdForUserPage(state, action){
            state.userIdForUserPage = action.payload;
        },
        takePostIdForFetch(state,action){
            state.postIdForFetch = action.payload;
        }

    },
    extraReducers:{
        [fetchUsers.pending]: ()=>{
            
        },
        [fetchUsers.fulfilled]: (state, action)=>{
            state.users = action.payload;
            state.users.forEach(item=>item.posts=[])
            console.log(state.users);
        },
        [fetchUsers.rejected]: ()=>{
            alert('some problem with server, try again later');
        },

        [fetchUserPostPrev.pending]: (state)=>{
            state.users[state.userIdForUserPage-1].posts = []
        },
        [fetchUserPostPrev.fulfilled]: (state, action)=>{
            action.payload.map(item => state.users[state.userIdForUserPage-1].posts.push(item));
        },
        [fetchUserPostPrev.rejected]: ()=>{
            alert('some problem with server, try again later');
        },
        [fetchUserPosts.pending]: (state)=>{
            let userIndex = state.userIdForUserPage-1;
            state.users[userIndex].posts.slice(0,state.users[userIndex].posts.length);
        },
        [fetchUserPosts.fulfilled]: (state, action)=>{
            let userIndex = state.userIdForUserPage-1;
            let fetchData = action.payload;
            fetchData.forEach(item=>item.comments=[]);
            state.users[userIndex].posts=fetchData;
        },
        [fetchUserPosts.rejected]: ()=>{
            alert('some problem with server, try again later');
        },

        [fetchPostComments.pending]: ()=>{
            
        },
        [fetchPostComments.fulfilled]: (state, action)=>{
            let userIndexArrayInState = state.userIdForUserPage-1;
            let postId = state.postIdForFetch;
            let postIndex = state.users[userIndexArrayInState].posts.findIndex(item=>item.id===postId);
            const fetchData = action.payload;
            state.users[userIndexArrayInState].posts[postIndex].comments=fetchData;
            
        },
        [fetchPostComments.rejected]: ()=>{
            alert('some problem with server, try again later');            
        },

        [fetchNewComment.pending]: ()=>{
            
        },
        [fetchNewComment.fulfilled]: (state, action)=>{
            let userIndexArrayInState = state.userIdForUserPage-1;
            let postId = state.postIdForFetch;
            let postIndex = state.users[userIndexArrayInState].posts.findIndex(item=>item.id===postId);
            const fetchData = action.payload;
            state.users[userIndexArrayInState].posts[postIndex].comments.push(fetchData);
        },
        [fetchNewComment.rejected]: ()=>{
            alert('some problem with server, try again later');
        },
    }
})

export const {takeUserIdForUserPage, takePostIdForFetch} = userSlice.actions

export default userSlice.reducer;