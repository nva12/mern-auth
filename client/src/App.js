import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/signup' component={SignUpScreen} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
