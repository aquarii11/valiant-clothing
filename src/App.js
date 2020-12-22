import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import './App.css';
import { Switch,Route } from 'react-router-dom';
import Header from './components/header/header.component.jsx';
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
  render() {
    return(<div className="App">
               <Header />
               <Switch>
                     <Route exact path='/' component={HomePage} />
                     <Route path='/hats' component={HatsPage} />
                     <Route path='/shop' component={ShopPage} />
                      <Route path='/jackets' component={JacketsPage} />
               </Switch>
               
           </div>)
  }
}

export default App;