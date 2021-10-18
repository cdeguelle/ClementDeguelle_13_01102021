import { React } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import Profile from './pages/Profile'
import GlobalStyle from './utils/style/GlobalStyle'

const App = () => {  
    return (
        <Router>
            <GlobalStyle />
            <Header />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/sign-in">
                    <LogIn />
                </Route>
                <Route path="/profile">
                    <Profile />
                </Route>
            </Switch>
            <Footer />
        </Router>
    )
}

export default App
