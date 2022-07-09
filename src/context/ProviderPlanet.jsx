import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import contextPlanet from './contextPlanet';

function ProviderPlanet(props) {
  const [filterByName, setFilterByName] = useState('');
  const [fetchPlanets, setFetchPlanets] = useState({});
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [numeralFilters, setNumeralFilters] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );
  const [filteredList, setFilteredList] = useState([]);
  const [columns, setColumns] = useState([]);
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
  useEffect(() => {
    const data = async () => {
      const fetchApi = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const fetchJson = await fetchApi.json();
      setFetchPlanets(fetchJson);
      buildTable(fetchJson.results);
      console.log(fetchJson);
    };
    data();
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

  const filteredByData = (columnFilter, comparisonFilter, number, list) => {
    const numero = Number(number);
    const lista = list.filter((r) => {
      const titles = Object.entries(r);
      const coluna = titles.filter((res) => res[0] === columnFilter);
      if (comparisonFilter === 'maior que') {
        if (Number((coluna[0][1])) > numero) return r;
      } else if (comparisonFilter === 'menor que') {
        if (Number((coluna[0][1])) < numero) return r;
      } else if (Number((coluna[0][1])) === numero) return r;
      return null;
    });
    setFilteredList(lista);
    if (lista.length === 0) {
      buildTable(fetchPlanets.results);
    } else {
      buildTable(lista);
    }
  };

  const filter3 = (columnFilter, comparisonFilter, number) => {
    if (filteredList.length === 0) {
      filteredByData(columnFilter, comparisonFilter, number, fetchPlanets.results);
    } else {
      filteredByData(columnFilter, comparisonFilter, number, filteredList);
    }
    if (numeralFilters.length === 1) {
      setNumeralFilters('');
    } else {
      const newNumeralFilters = numeralFilters.filter((num) => num !== columnFilter);
      setNumeralFilters(newNumeralFilters);
    }
    setSelectedFilter(
      [...selectedFilter, [columnFilter, comparisonFilter, number]],
    );
  };

  const restoreFilters = (argument) => {
    if (argument === 'all') {
      setNumeralFilters(
        ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
      );
      setSelectedFilter([]);
      buildTable(fetchPlanets.results);
    } else {
      const add = selectedFilter.filter((s) => s[0] === argument);
      setNumeralFilters([...numeralFilters, add[0][0]]);
      const removeSelected = selectedFilter.filter((s) => s[0] !== argument);
      setSelectedFilter(removeSelected);
      if (removeSelected.length === 0) {
        buildTable(fetchPlanets.results);
      }
      removeSelected.forEach((item, index) => {
        if (index === 0) {
          filteredByData(item[0], item[1], Number(item[2]), fetchPlanets.results);
        } else {
          filteredByData(item[0], item[1], Number(item[2]), filteredList);
        }
      });
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
        numeralFilters,
        selectedFilter,
        restoreFilters,
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
