import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import contextPlanet from './contextPlanet';

function ProviderPlanet(props) {
  const [fetchPlanets, setFetchPlanets] = useState({});
  const [columns, setColumns] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [lines, setLines] = useState([]);
  const { children } = props;

  const buildTable = (list) => {
    const topics = Object.keys(list[0]);
    const top = topics.filter((topic) => topic !== 'residents');
    const title = top.map((topic, index) => (
      <th key={ index }>{topic}</th>
    ));
    const row = list.map((result, index) => (
      <tr key={ index }>
        {
          Object.values(result).map((res, i) => (
            <td key={ i }>{ res }</td>
          ))
        }
      </tr>
    ));
    setColumns(title);
    setLines(row);
  };

  // Chamada na Fetch (ComponentDidMount())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const fetchApi = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const fetchJson = await fetchApi.json();
    setFetchPlanets(fetchJson);
    buildTable(fetchJson.results);
  }, []);

  const planetFilter = ({ target }) => {
    const { value } = target;
    setFilterByName(value);
    if (value.length === 0) {
      buildTable(fetchPlanets.results);
    } else {
      const filter = fetchPlanets.results.filter((r) => r.name.includes(value));
      buildTable(filter);
    }
  };

  const filter3 = (columnFilter, comparisonFilter, number) => {
    const numero = Number(number);
    const lista = fetchPlanets.results.filter((r) => {
      const titles = Object.entries(r);
      const coluna = titles.filter((res) => res[0] === columnFilter);
      if (comparisonFilter === 'maior que') {
        if (Number((coluna[0][1])) > numero) return r;
      } else if (comparisonFilter === 'menor que') {
        if (Number((coluna[0][1])) < numero) return r;
      } else if (Number((coluna[0][1])) === numero) return r;
      return null;
    });
    if (lista.length === 0) {
      buildTable(fetchPlanets.results);
    } else {
      buildTable(lista);
    }
  };

  return (
    <contextPlanet.Provider
      value={ {
        columns,
        lines,
        filterByName,
        planetFilter,
        filter3,
      } }
    >
      { children }
    </contextPlanet.Provider>
  );
}

ProviderPlanet.propTypes = {
  children: PropTypes.string.isRequired,
};

export default ProviderPlanet;
