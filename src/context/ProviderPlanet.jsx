import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import contextPlanet from './contextPlanet';

function ProviderPlanet(props) {
  const [showTopics, setShowTopics] = useState([]);
  const [lines, setLines] = useState([]);
  const { children } = props;

  useEffect(async () => {
    const fetchApi = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const fetchJson = await fetchApi.json();
    const topics = Object.keys(fetchJson.results[0]);
    const top = topics.filter((topic) => topic !== 'residents');
    const title = top.map((topic, index) => (
      <th key={ index }>{topic}</th>
    ));
    const row = fetchJson.results.map((result, index) => (
      <tr key={ index }>
        {
          Object.values(result).map((res, i) => (
            <td key={ i }>{ res }</td>
          ))
        }
      </tr>
    ));
    setShowTopics(title);
    setLines(row);
  }, []);

  return (
    <contextPlanet.Provider value={ { showTopics, lines } }>
      { children }
    </contextPlanet.Provider>
  );
}

ProviderPlanet.propTypes = {
  children: PropTypes.string.isRequired,
};

export default ProviderPlanet;
