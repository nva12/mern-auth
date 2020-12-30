import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import AccountActivationScreen from './screens/AccountActivationScreen';

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/signup' component={SignUpScreen} />
          <Route path='/signin' component={SignInScreen} />
          <Route
            path='/activate-account/:token'
            component={AccountActivationScreen}
          />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
