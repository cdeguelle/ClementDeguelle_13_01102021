import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { selectUser } from '../utils/selectors'

const initialState = {
    firstName: '',
    lastName: '',
    isLoggedIn: false,
    token: ''
}

export async function fetchUserLogin(dispatch, email, password) {
    axios
        .post('http://localhost:3001/api/v1/user/login', {
            email: email,
            password: password,
        })
        .then(response => dispatch(actions.resolved(response.data.body.token)))
        .catch(error => dispatch(actions.rejected(error)))
}

export async function fetchUserProfile(dispatch, getState) {
    const token = selectUser(getState()).token
    const headers = { 'Authorization': `Bearer ${token}` }
    axios
        .post('http://localhost:3001/api/v1/user/profile', {}, { headers })
        .then(response => dispatch(actions.userProfile(response.data.body)))
        .catch(error => console.log(error))
}

export async function fetchUpdateProfile(dispatch, getState) {
    const token = selectUser(getState()).token
    const firstName = selectUser(getState()).firstName
    const lastName = selectUser(getState()).lastName
    const headers = { 'Authorization': `Bearer ${token}` }
    axios
        .put('http://localhost:3001/api/v1/user/profile', {
            firstName: firstName,
            lastName: lastName
        }, { headers })
        .then(response => dispatch(actions.userProfile(response.data.body)))
        .catch(error => console.log(error))
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
        userProfile: (draft, action) => {
            draft.firstName = action.payload.firstName
            draft.lastName = action.payload.lastName
            return
        },
        updateFirstName: (draft, action) => {
            draft.firstName = action.payload
            return
        },
        updateLastName: (draft, action) => {
            draft.lastName = action.payload
            return
        }
    }
})

export const { rejected, resolved, userProfile, updateFirstName, updateLastName } = actions

export default reducer
