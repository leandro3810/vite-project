import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './Arquivo_header'
import Footer from './Footer'
import { soma, multiplicacao } from './utils/calculos'
import { formatarMoeda } from './utils/formatacao'
import './App.css'
import './global.css'

const valor1 = 10
const valor2 = 5

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <main>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <section>
          <h2>Resultados de Cálculo</h2>
          <p>Soma de {valor1} + {valor2}: {soma(valor1, valor2)}</p>
          <p>Multiplicação de {valor1} × {valor2}: {multiplicacao(valor1, valor2)}</p>
          <p>Moeda Formatada: {formatarMoeda(1234.56)}</p>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App
