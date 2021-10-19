import { Link } from 'react-router-dom'
import { StyledLink, TitleHidden } from '../../utils/style/Atoms'
import styled from 'styled-components'
import ArgentBankLogo from '../../assets/argentBankLogo.png'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../utils/selectors'
import * as userActions from '../../features/user'

const HomeLogo = styled.img`
    max-width: 100%;
    width: 200px;
`

const NavContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 20px;
    & a {
        font-weight: bold;
        color: #2c3e50;
    }
`

function Header() {
    const { isLoggedIn } = useSelector(selectUser)
    const dispatch = useDispatch()

    return (
        <NavContainer>
            <Link to="/">
                <HomeLogo src={ArgentBankLogo} />
                <TitleHidden>Argent Bank</TitleHidden>
            </Link>
            <div>
                {!isLoggedIn ? (
                    <StyledLink to="/sign-in">
                        <i className="fa fa-user-circle" style={{ marginRight: '10px' }}></i>
                        Sign In
                    </StyledLink>
                ) : (
                    <div style={{ display: 'flex' }}>
                        <StyledLink to='/user' style={{ marginRight: '20px' }}>
                            <i className="fa fa-user-circle" style={{ marginRight: '5px' }}></i>
                            Tony
                        </StyledLink>
                        <StyledLink to="/" onClick={() => dispatch(userActions.rejected())}>
                            <i className="fa fa-sign-out" style={{ marginRight: '5px' }}></i>
                            Sign Out
                        </StyledLink>
                    </div>
                )} 
            </div>
        </NavContainer>
    )
}

export default Header