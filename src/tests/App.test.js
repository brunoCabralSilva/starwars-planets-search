import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import objectMock from './objectMock';

const planetLists = () => {
  return {
    tatooine: screen.getByRole('cell', {
      name: /tatooine/i
    }),
    yavin: screen.getByRole('cell', {
      name: /yavin iv/i
    }),
    alderaan: screen.getByRole('cell', {
      name: /alderaan/i
    }),
    hoth: screen.getByRole('cell', {
      name: /hoth/i
    }),
    dagobah: screen.getByRole('cell', {
      name: /dagobah/i
    }),
    bespin: screen.getByRole('cell', {
      name: /Bespin/i
    }),
    endor: screen.getByRole('cell', {
      name: /Endor/i
    }),
    naboo: screen.getByRole('cell', {
      name: /Naboo/i
    }),
    coruscant: screen.getByRole('cell', {
      name: /coruscant/i
    }),
    kamino: screen.getByRole('cell', {
      name: /Kamino/i
    })
  }
};

describe('Testes de Existẽncia de Filtros de busca', () => {

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue(
      { json: jest.fn().mockResolvedValue(objectMock) });
    render(<App />);
  });

  it('Verifica se o input para filtro de planetas está no documento', () => {
    const inputPlanet = screen.getByTestId("name-filter");
    expect(inputPlanet).toBeInTheDocument();
  });

  it('Verifica se os campos de Filtros numéricos juntamente com o botão de busca estão no documento', () => {
    const column = screen.getByTestId("column-filter");
    const comparison = screen.getByTestId("comparison-filter");
    const value = screen.getByTestId("value-filter");
    const button = screen.getByTestId("button-filter");
    expect(column).toBeInTheDocument();
    expect(comparison).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('Verifica se só é possível digitar números no campo de valor numérico', () => {
    const value = screen.getByTestId("value-filter");
    const number = 0;
    userEvent.type(value, 'Não mostrar');
    expect(value).toHaveValue(number);
    const number2 = 456;
    userEvent.type(value, '456');
    expect(value).toHaveValue(number2);
  });

  it('Verifica se, ao clicar no botão de filtrar, o filtro aparece na tela', () => {
    const filter = screen.getByTestId("button-filter");
    userEvent.click(filter);
    const filtro = screen.getByText(/population maior que 0/i);
    expect(filtro).toBeInTheDocument();
  });

  it('Verifica se, ao adicionar um filtro, o botão de remover todos os itens aparece na tela', () => {
    const filter = screen.getByTestId("button-filter");
    userEvent.click(filter);
    const removeAllFilters = screen.getByTestId("button-remove-filters");
    expect(removeAllFilters).toBeInTheDocument();
  });

  it('Verifica se, ao clicar no botão de apagar específico do filtro, o filtro em questão é apagado', () => {
    const filter = screen.getByTestId("button-filter");
    userEvent.click(filter);
    const filtro = screen.getByText(/population maior que 0/i);
    const buttonDelete = screen.getByRole('button', {
      name: /apagar/i
    });
    userEvent.click(buttonDelete);
    expect(filtro).not.toBeInTheDocument();
  });

});

describe('Testes de Existẽncia da Tabela', () => {

  beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue(
    { json: jest.fn().mockResolvedValue(objectMock)}
  );
  render(<App />);
  });

  // it('Verifica se a função fetch foi chamada ao carregar a tela', () => {
  //   render(<App />);   
  //   expect(global.fetch).toBeCalledTimes(1);
  // })

  it('Verifica todos os titulos são exibidos, exceto residents', () => {
    const titles = [
      "name", "rotation_period",	"orbital_period",	"diameter",	"climate", "gravity", "terrain",	"surface_water",	"population", "films",	"created",	"edited", "url"
    ];
    titles.forEach((index) => {
      const title = screen.getByRole('columnheader', {
        name: index,
      })
      expect(title).toBeInTheDocument();
    });
      const residents = screen.queryByText(/residents/i);
      expect(residents).toBeNull();
  });

  it('Verifica se todos os planetas são mostrados na tela ao iniciar a aplicação', () => {
    render(<App />);
    const titles = [
      "Tatooine", "Alderaan",	"Yavin IV",	"Hoth",	"Dagobah", "Bespin", "Endor",	"Naboo",	"Coruscant",	"Kamino"
    ];
     
    titles.forEach((index) => {
      const title = screen.getByRole('cell', {
        name: index,
      })
      expect(title).toBeInTheDocument();
    });
  });
});

describe('Testes de Funcionalidade dos filtros', () => {

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue(
      { json: jest.fn().mockResolvedValue(objectMock) });
    render(<App />);
  });

   it('Verifica se todos os outros planetas somem da tela ao digitar Tatooine', () => {
    const inputPlanet = screen.getByTestId("name-filter");
    const planets = planetLists();
    userEvent.type(inputPlanet, 'Ta');
  
    expect(planets.tatooine).toBeInTheDocument();
    expect(planets.yavin).not.toBeInTheDocument();
    expect(planets.alderaan).not.toBeInTheDocument();
    expect(planets.hoth).not.toBeInTheDocument();
    expect(planets.dagobah).not.toBeInTheDocument();
    expect(planets.bespin).not.toBeInTheDocument();
    expect(planets.endor).not.toBeInTheDocument();
    expect(planets.naboo).not.toBeInTheDocument();
    expect(planets.coruscant).not.toBeInTheDocument();
    expect(planets.kamino).not.toBeInTheDocument();

    userEvent.click(inputPlanet);
    userEvent.keyboard('{backspace}');
    userEvent.keyboard('{backspace}');
    userEvent.keyboard('{del}');
    userEvent.keyboard('{del}');
  });

  // it('Verifica se todos os outros planetas somem da tela ao digitar Alderaan', () => {
  //   const inputPlanet = screen.getByTestId("name-filter");
  //   const planets = planetLists();
  //   userEvent.type(inputPlanet, 'Alderaan');

  //   expect(planets.yavin).not.toBeInTheDocument();
  //   expect(planets.alderaan).toBeInTheDocument();
  //   expect(planets.hoth).not.toBeInTheDocument();
  //   expect(planets.dagobah).not.toBeInTheDocument();
  //   expect(planets.bespin).not.toBeInTheDocument();
  //   expect(planets.endor).not.toBeInTheDocument();
  //   expect(planets.naboo).not.toBeInTheDocument();
  //   expect(planets.coruscant).not.toBeInTheDocument();
  //   expect(planets.kamino).not.toBeInTheDocument();
  // });

  // it('Verifica se todos os outros planetas somem da tela ao digitar Naboo', () => {
  //   const inputPlanet = screen.getByTestId("name-filter");
  //   const planets = planetLists();
  //   userEvent.type(inputPlanet, 'Naboo');
  
  //   expect(planets.tatooine).not.toBeInTheDocument();
  //   expect(planets.yavin).not.toBeInTheDocument();
  //   expect(planets.alderaan).not.toBeInTheDocument();
  //   expect(planets.hoth).not.toBeInTheDocument();
  //   expect(planets.dagobah).not.toBeInTheDocument();
  //   expect(planets.bespin).not.toBeInTheDocument();
  //   expect(planets.endor).not.toBeInTheDocument();
  //   expect(planets.naboo).toBeInTheDocument();
  //   expect(planets.coruscant).not.toBeInTheDocument();
  //   expect(planets.kamino).not.toBeInTheDocument();
  // });

  // it('Verifica se hoth e Dagobah aparecem e os demais somem da tela ao digitar "h"', ()=> {
  //   render(<App />);
  //   const inputPlanet = screen.getByTestId("name-filter");

  //   userEvent.type(inputPlanet, 'h');
  //   expect(alderaan).not.toBeInTheDocument();
  //   expect(tatooine).not.toBeInTheDocument();
  //   expect(yavin).not.toBeInTheDocument();
  //   expect(hoth).toBeInTheDocument();
  //   expect(dagobah).toBeInTheDocument();
  //   expect(coruscant).not.toBeInTheDocument();
  // });

  // it('Verifica se ao procurar por população de ', () => {
  //   const value = screen.getByTestId("value-filter");
  //   const button = screen.getByTestId("button-filter");

  //   const tatooine = screen.getByRole('cell', {
  //     name: /tatooine/i
  //   });
  //   const yavin = screen.getByRole('cell', {
  //     name: /yavin iv/i
  //   });
  //   const alderaan = screen.getByRole('cell', {
  //     name: /alderaan/i
  //   });
  //   const hoth = screen.getByRole('cell', {
  //     name: /hoth/i
  //   })
  //   const dagobah = screen.getByRole('cell', {
  //     name: /dagobah/i
  //   })

  //   const coruscant = screen.getByRole('cell', {
  //     name: /coruscant/i
  //   })

  //   const naboo = screen.getByRole('cell', {
  //     name: /naboo/i
  //   })

  //   userEvent.type(value, '2000000000');
  //   userEvent.click(button);

  //   expect(alderaan).not.toBeInTheDocument();
  //   expect(naboo).toBeInTheDocument();
  //   expect(tatooine).not.toBeInTheDocument();
  //   expect(yavin).not.toBeInTheDocument();
  //   expect(hoth).not.toBeInTheDocument();
  //   expect(dagobah).not.toBeInTheDocument();
  //   expect(coruscant).toBeInTheDocument();
  // });
});
