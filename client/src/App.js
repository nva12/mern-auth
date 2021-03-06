import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './context';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Layout from './components/Layout';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import AccountActivationScreen from './screens/AccountActivationScreen';
import PrivateScreen from './screens/PrivateScreen';
import AdminScreen from './screens/AdminScreen';

const App = () => {
  return (
    <AuthProvider>
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
            <PrivateRoute path='/private' component={PrivateScreen} />
            <AdminRoute path='/admin' component={AdminScreen} />
          </Switch>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
