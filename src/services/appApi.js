import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
//define a service user a base url

const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000'
    }),

    endpoints: (builder) => ({
        //creating user
        signupUser: builder.mutation({
            query: (user) => ({
                url: '/users/signup ',
                method: 'POST',
                body: user
            })
        }),

        //log in user
        loginUser: builder.mutation({
            query: (user) => ({
                url: '/users/login',
                method: "POST",
                body: user
            })
        }),
        
        editUser: builder.mutation({
            query: (user) => ({
                url: 'users/edit',
                method: "PATCH",
                body: user
            })
        }),

        //logout
        logoutUser: builder.mutation({
            query: (payload) =>({
                url: '/logout',
                method: "DELETE",
                body: payload
            }),
        }),
    }),
});


export  const { useSignupUserMutation, useLoginUserMutation, useLogoutUserMutation, useEditUserMutation  } = appApi;
export default appApi;