import React from 'react';
import Tabela from './components/Table';
import './App.css';
import ProviderPlanet from './context/ProviderPlanet';

function App() {
  return (
    <ProviderPlanet>
      <Tabela />
    </ProviderPlanet>
  );
}

export default App;
