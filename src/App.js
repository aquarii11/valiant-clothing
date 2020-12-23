import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import './App.css';
import { Switch,Route } from 'react-router-dom';
import Header from './components/header/header.component.jsx';
import { auth,createUserProfileDocument } from './firebase/firebase.utils';
const HatsPage = () => (
  <div>
    <h1>HATS PAGE </h1>
  </div>
);
const JacketsPage = () => (
  <div>
    <h1>JACKETS PAGE </h1>
  </div>
);
class App extends React.Component {
  constructor()
  {
      super();
      this.state = {
          currentUser: null
      }
  }
   unsubscribeFromAuth = null;
   componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth)
      {
           const userRef = await createUserProfileDocument(userAuth)
           userRef.onSnapshot((snapShot)=>
           {
                        this.setState({currentUser: {
                      id: snapShot.id,
                      ...snapShot.data()
                    }},()=>
                    {
                      console.log(this.state)
                    })

           })
      }
      
      this.setState({ currentUser: userAuth });
      
    });
  }
   componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return(<div className="App">
               <Header  currentUser={this.state.currentUser} />
               <Switch>
                     <Route exact path='/' component={HomePage} />
                      <Route path='/signin' component={SignInAndSignUpPage} />
                     <Route path='/hats' component={HatsPage} />
                     <Route path='/shop' component={ShopPage} />
                      <Route path='/jackets' component={JacketsPage} />
               </Switch>
               
           </div>)
  }
}

export default App;