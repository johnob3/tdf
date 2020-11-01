import React from 'react';
import { awsconfig } from './config/aws-exports'
import { Authenticator } from "aws-amplify-react"
import { AuthWrapper } from "./auth/AuthWrapper"
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Authenticator hideDefault={true} amplifyConfig={awsconfig} container={null}>
        <AuthWrapper />
      </Authenticator>
    </BrowserRouter>
  );
}

export default App;
