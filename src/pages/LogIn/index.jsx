import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const LogInWrapper = styled.main`
    flex: 1;
    background-color: #12002b;
`

const SignInContent = styled.section`
    box-sizing: border-box;
    background-color: white;
    width: 300px;
    margin: 0 auto;
    margin-top: 3rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 1rem;
    & label {
        font-weight: bold;
    }
    & input {
        padding: 5px;
        font-size: 1.2rem;
    }
`

const InputRemember = styled.div`
    display: flex;
    & label {
        margin-left: 0.25rem;
    }
`

const SignInButton = styled(Link) `
    display: block;
    width: 95%;
    padding: 8px;
    font-size: 1.1rem;
    font-weight: bold;
    margin-top: 1rem;
    border-color: #00bc77;
    background-color: #00bc77;
    color: #fff;
    text-align: center;
`

function LogIn() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <LogInWrapper>
            <SignInContent>
                <i class="fa fa-user-circle"></i>
                <h1>Sign In</h1>
                <form>
                    <InputWrapper>
                        <label for="username">Username</label>
                        <input type="text" id="username" onChange={event => setUsername(event.target.value)} />
                    </InputWrapper>
                    <InputWrapper>
                        <label for="password">Password</label>
                        <input type="password" id="password" onChange={event => setPassword(event.target.value)} />
                    </InputWrapper>
                    <InputRemember>
                        <input type="checkbox" id="remember-me" />
                        <label for="remember-me">Remember me</label>
                    </InputRemember>
                    <SignInButton to='/profile'>Sign In</SignInButton>
                </form>
            </SignInContent>
        </LogInWrapper>
    )
}

export default LogIn