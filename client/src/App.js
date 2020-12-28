import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path='/' component={HomeScreen} exact />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
