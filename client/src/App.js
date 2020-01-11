import React, {Fragment, useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';


//Import components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar';
import Editor from './components/editor/Editor';
import Alert from './components/layout/Alert';
import Profile from './components/profile/Profile';
import Articles from './components/articles/Articles';
import Article from './components/article/Article';
import PrivateRoute from './components/routing/PrivateRoute';


//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';


 if(localStorage.token){
       setAuthToken(localStorage.token);
   }


const App = () =>{

  useEffect(()=>{
    store.dispatch(loadUser())
  }, [loadUser]);

  return (
  <Provider store={store}>
   <Router>
   <Navbar/>
   <section>
   <Alert />
   <Route exact path= '/' component={Articles}/>
   <Route exact path= '/articles/:id' component={Article}/>
   <Route exact path='/register' component={Register}/>
   <Route exact path='/login' component={Login}/>
   <Route exac path='/profile' component={Profile}/>
   <PrivateRoute exac path='/editor' component={Editor}/>
   </section>
   </Router>
   </Provider>
  );
}



export default App;

