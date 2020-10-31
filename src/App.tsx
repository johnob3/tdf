import React from 'react';
import { awsconfig } from './config/aws-exports'
import { Authenticator } from "aws-amplify-react"
import { AuthWrapper } from "./auth/AuthWrapper"
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.scss';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Authenticator hideDefault={true} amplifyConfig={awsconfig} container={null}>
        <AuthWrapper />
      </Authenticator>
    </React.Fragment>
  );
}
export default App;
