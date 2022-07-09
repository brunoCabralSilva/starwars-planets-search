import React, { useContext } from 'react';
import contextPlanet from '../context/contextPlanet';

function App() {
  const state = useContext(contextPlanet);
  return (
    <table>
      <tr>
        { state.showTopics }
      </tr>
      { state.lines }
    </table>
  );
}

export default App;
