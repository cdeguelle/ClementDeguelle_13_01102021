import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { fetchUserProfile } from '../../features/user'
import { selectUser } from '../../utils/selectors'
import { TitleHidden } from '../../utils/style/Atoms'
import { fetchUpdateProfile } from '../../features/user'
import * as userActions from '../../features/user'

const UserWrapper = styled.main`
    flex: 1;
    background-color: #12002b;
`

const Header = styled.div`
    color: #fff;
    margin-bottom: 2rem;
`
    
const EditButton = styled.button`
    border-color: #00bc77;
    background-color: #00bc77;
    color: #fff;
    font-weight: bold;
    padding: 10px;
`
    
const Account = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid black;
    background-color: #fff;
    width: 80%;
    margin: 0 auto;
    flex-direction: column;
    padding: 1.5rem;
    box-sizing: border-box;
    text-align: left;
    margin-bottom: 2rem;
    @media (min-width: 720px) {
        flex-direction: row;
    }
`
    
const AccountContentWrapper = styled.div`
    width: 100%;
    flex: 1;
    &.cta {
        @media (min-width: 720px) {
            flex: 0;
        }
    }
`
    
const AccountTitle = styled.h3`
    margin: 0;
    padding: 0;
    font-size: 1rem;
    font-weight: normal;
`
    
const AccountAmount = styled.p`
    margin: 0;
    font-size: 2.5rem;
    font-weight: bold;
`
    
const AccountAmountDescription = styled.p`
    margin: 0;
`
    
const TransactionButton = styled.button`
    display: block;
    width: 100%;
    padding: 8px;
    font-size: 1.1rem;
    font-weight: bold;
    margin-top: 1rem;
    border-color: #00bc77;
    background-color: #00bc77;
    color: #fff;
    @media (min-width: 720px) {
        width: 200px;
    }
`

const NameEditing = styled.div`
    display: flex;
    flex-direction: column;
`

const EditNameForm = styled.form`
    display: flex;
    justify-content: center;
`

const NameInput = styled.input`
    height: 30px;
    margin: 0 20px;
`

const EditNameButtons = styled.div`
    display: flex;
    justify-content: center;
    margin: 15px 0;
`

const NameButton = styled.button`
    height: 30px;
    width: 100px;
    margin: 0 20px;
    border-color: #00bc77;
    color: #00bc77;
`
    
function Profile() {
    const user = useSelector(selectUser)
    const [isEditing, setIsEditing] = useState(false)
    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)

    useEffect(() => {
        dispatch(fetchUserProfile)
    }, [dispatch])

    const saveButtonFunctions = () => {
        setIsEditing(false)
        dispatch(userActions.updateFirstName(firstName))
        dispatch(userActions.updateLastName(lastName))
        dispatch(fetchUpdateProfile)
    }

    const cancelButtonFunctions = () => {
        setIsEditing(false)
        setFirstName(user.firstName)
        setLastName(user.lastName)
    }

    return (
        <UserWrapper>
            <Header>
                {isEditing ? (
                    <NameEditing>
                        <h1>Welcome back</h1>
                        <EditNameForm>
                            <NameInput type="text" id="firstname" placeholder={user.firstName} onChange={(e) => setFirstName(e.target.value)} />
                            <NameInput type="text" id="lastname" placeholder={user.lastName} onChange={(e) => setLastName(e.target.value)} />
                        </EditNameForm>
                        <EditNameButtons>
                            <NameButton onClick={() => saveButtonFunctions()}>Save</NameButton>
                            <NameButton onClick={() => cancelButtonFunctions()}>Cancel</NameButton>
                        </EditNameButtons>
                    </NameEditing>
                ) : (
                    <div>
                        <h1>Welcome back<br />{user.firstName} {user.lastName}!</h1>
                        <EditButton onClick={() => setIsEditing(true)}>Edit Name</EditButton>
                    </div>
                )}
            </Header>
            <TitleHidden>Accounts</TitleHidden>
            <Account>
                <AccountContentWrapper>
                    <AccountTitle>Argent Bank Checking (x8349)</AccountTitle>
                    <AccountAmount>$2,082.79</AccountAmount>
                    <AccountAmountDescription>Available Balance</AccountAmountDescription>
                </AccountContentWrapper>
                <AccountContentWrapper className='cta'>
                    <TransactionButton>View transactions</TransactionButton>
                </AccountContentWrapper>
            </Account>
            <Account>
                <AccountContentWrapper>
                    <AccountTitle>Argent Bank Savings (x6712)</AccountTitle>
                    <AccountAmount>$10,928.42</AccountAmount>
                    <AccountAmountDescription>Available Balance</AccountAmountDescription>
                </AccountContentWrapper>
                <AccountContentWrapper className='cta'>
                    <TransactionButton>View transactions</TransactionButton>
                </AccountContentWrapper>
            </Account>
            <Account>
                <AccountContentWrapper>
                    <AccountTitle>Argent Bank Credit Card (x8349)</AccountTitle>
                    <AccountAmount>$184.30</AccountAmount>
                    <AccountAmountDescription>Available Balance</AccountAmountDescription>
                </AccountContentWrapper>
                <AccountContentWrapper className='cta'>
                    <TransactionButton>View transactions</TransactionButton>
                </AccountContentWrapper>
            </Account>
        </UserWrapper>
    )
} 

export default Profile