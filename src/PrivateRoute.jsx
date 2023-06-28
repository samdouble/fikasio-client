import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import links from './utils/links';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const loginState = useSelector(state => state.login);

  return (
    <Route {...rest} render={props => (
      loginState ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: links.paths.login,
          state: { from: props.location }
        }}/>
      )
    )}/>
  );
};

export default PrivateRoute;
