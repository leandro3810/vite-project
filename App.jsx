import React from 'react';
import { soma, multiplicacao } from './utils/calculos';
import { formatarMoeda } from './utils/formatacao';

function App() {
  const valor1 = 10;
  const valor2 = 5;

  return (
    <div>
      <h1>Resultados</h1>
      <p>Soma: {soma(valor1, valor2)}</p>
      <p>Multiplicação: {multiplicacao(valor1, valor2)}</p>
      <p>Moeda Formatada: {formatarMoeda(1234.56)}</p>
    </div>
  );
}

export default App;
