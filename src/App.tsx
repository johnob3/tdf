import React from 'react';
import { awsconfig } from './config/aws-exports'
import { Authenticator } from "aws-amplify-react"
import { AuthWrapper } from "./auth/AuthWrapper"
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Authenticator amplifyConfig={awsconfig}>
          <AuthWrapper />
        </Authenticator>
      </header>
    </div>
  );
}
export default App;
