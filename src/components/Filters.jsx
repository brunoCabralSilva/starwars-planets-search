import React, { useContext, useState } from 'react';
import contextPlanet from '../context/contextPlanet';

function Filters() {
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setcomparisonFilter] = useState('maior que');
  const [number, setNumber] = useState(0);
  const state = useContext(contextPlanet);
  const { planetFilter, filterByName, filter3, numeralFilters } = state;
  return (
    <div>
      <div>
        <input
          type="text"
          data-testid="name-filter"
          value={ filterByName }
          name="planet"
          onChange={ planetFilter }
        />
      </div>
      <div>
        <select
          data-testid="column-filter"
          onChange={ (e) => setColumnFilter(e.target.value) }
          value={ columnFilter }
        >
          {
            numeralFilters.length > 0 && numeralFilters.map((filter, index) => (
              <option value={ filter } key={ index }>{ filter }</option>
            ))
          }
        </select>
        <select
          data-testid="comparison-filter"
          value={ comparisonFilter }
          onChange={ (e) => setcomparisonFilter(e.target.value) }
        >
          <option valuer="maior que">maior que</option>
          <option valuer="menor que">menor que</option>
          <option valuer="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          value={ number }
          onChange={ (e) => setNumber(e.target.value) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => filter3(columnFilter, comparisonFilter, number) }
        >
          Filtrar
        </button>
      </div>
    </div>
  );
}

export default Filters;
