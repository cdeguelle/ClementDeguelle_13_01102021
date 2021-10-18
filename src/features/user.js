import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    firstName: '',
    lastName: '',
    isLoggedIn: false,
    email: '',
    password: '',
    token: ''
}

export async function fetchUserLogin(dispatch, email, password) {
    axios
        .post('http://localhost:3001/api/v1/user/login', {
            email: email,
            password: password,
        })
        .then(response => dispatch(actions.resolved(response.data.token)))
        .catch(error => dispatch(actions.rejected(error)))
}

const { actions, reducer } = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resolved: (draft, action) => {
            draft.isLoggedIn = true
            draft.token = action.payload
            return
        },
        rejected: (draft) => {
            draft.isLoggedIn = false
            draft.token = ''
            return
        },
    },
})

export const { rejected, resolved } = actions

export default reducer
