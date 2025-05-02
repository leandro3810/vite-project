import React from 'react';

function App() {
  // Função criada dentro do componente
  const minhaFuncao = () => {
    alert('Olá do React!');
  };

  return (
    <div>
      <h1>Projeto com Vite + React</h1>
      <button onClick={minhaFuncao}>Clique aqui</button>
    </div>
  );
}

export default App;
