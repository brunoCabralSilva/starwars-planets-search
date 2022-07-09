import React, { useContext, useState } from 'react';
import contextPlanet from '../context/contextPlanet';

function Filters() {
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setcomparisonFilter] = useState('maior que');
  const [number, setNumber] = useState(0);
  const state = useContext(contextPlanet);
  const {
    planetFilter,
    filterByName,
    filter3,
    numeralFilters,
    selectedFilter,
    restoreFilters,
  } = state;

  const removeAllFilters = () => (
    <button
      type="button"
      data-testid="button-remove-filters"
      onClick={ () => restoreFilters('all') }
    >
      Remover todos os filtros
    </button>
  );

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
          onClick={ () => {
            setColumnFilter(numeralFilters[1]);
            filter3(columnFilter, comparisonFilter, number);
          } }
        >
          Filtrar
        </button>
      </div>
      <div>
        {
          selectedFilter.length > 0 && selectedFilter.map((filter, index) => (
            <div key={ index } data-testid="filter">
              {`${filter[0]} ${filter[1]} ${filter[2]}`}
              <button
                type="button"
                onClick={ () => restoreFilters(filter[0]) }
              >
                Apagar
              </button>
            </div>
          ))
        }
      </div>
      <div>
        {
          selectedFilter.length > 0 && removeAllFilters()
        }
      </div>
    </div>
  );
}

export default Filters;
