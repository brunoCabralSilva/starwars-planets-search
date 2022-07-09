import React from 'react';
import Tabela from './components/Table';
import Filters from './components/Filters';
import './App.css';
import ProviderPlanet from './context/ProviderPlanet';

function App() {
  return (
    <ProviderPlanet>
      <Filters />
      <Tabela />
    </ProviderPlanet>
  );
}

export default App;
