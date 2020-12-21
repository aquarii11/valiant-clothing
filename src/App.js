import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import './App.css';
import { Switch,Route } from 'react-router-dom';

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
               <Switch>
                     <Route exact path='/' component={HomePage} />
                     <Route path='/hats' component={HatsPage} />
                      <Route path='/jackets' component={JacketsPage} />
               </Switch>
               
           </div>)
  }
}

export default App;