import React from 'react';
import { registerRootComponent } from 'expo';

import { AuthProvider } from './src/components/AuthContext'
import  { ChamaProvider } from './src/components/ChamaContext'
import Navigater from './src/components/Navigater';

function App() {
  return (
    <AuthProvider>
      <ChamaProvider>
        <Navigater />
      </ChamaProvider>
    </AuthProvider>
  );
}

registerRootComponent(() => App);

export default App;