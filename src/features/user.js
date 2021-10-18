import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    firstName: '',
    lastName: '',
    isLoggedIn: false, 
    email: '',
    password: ''
}

export async function fetchUserLogin(dispatch, email, password) {
    try {
        const response = await fetch('http://localhost:3001/api/v1/user/login', {
            method: 'POST',
            body: {email: email, password: password}
        })
        if (response.status === 200) {
            dispatch(actions.resolved())
        }
    } catch (error) {
        dispatch(actions.rejected(error))
    }
}

const { actions, reducer } = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resolved: (draft, action) => {
            draft.isLoggedIn = true
            return
        },
        rejected: (draft, action) => {
            draft.isLoggedIn = false
            return
        }
    }
})

export const { fetching, rejected, resolved } = actions

export default reducer