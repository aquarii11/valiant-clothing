import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import './App.css';
import { Switch,Route,Redirect } from 'react-router-dom';
import Header from './components/header/header.component.jsx';
import { auth,createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

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
  
   unsubscribeFromAuth = null;
   componentDidMount() {
    
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth)
      {
           const userRef = await createUserProfileDocument(userAuth)
           userRef.onSnapshot((snapShot)=>
           {
                        this.props.setCurrentUser({
                      id: snapShot.id,
                      ...snapShot.data()
                    })

           })
      }
      
      this.props.setCurrentUser(userAuth);
      
      
    });
  }
   componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return(<div className="App">
               <Header  />
               <Switch>
                     
                     <Route exact path='/' render={()=>this.props.currentUser ? (<HomePage /> ) : (<Redirect to="/signin" />) } />
                     
                      <Route exact path='/signin' render={()=>this.props.currentUser ? (<Redirect to='/' /> ) : (<SignInAndSignUpPage />) } />
                     <Route path='/hats' component={HatsPage} />
                     <Route path='/shop' component={ShopPage} />
                     <Route exact path='/checkout' component={CheckoutPage} />
                      <Route path='/jackets' component={JacketsPage} />
               </Switch>
               
           </div>)
  }
}
const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser
  
});
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default connect(mapStateToProps,mapDispatchToProps)(App);