import React, { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ textAlign: 'center', padding: 40 }}>
      <h1>Bem-vindo ao Vite Project!</h1>
      <p>Este é o seu novo aplicativo React com Vite.</p>
      <button onClick={() => setCount(count + 1)}>
        Você clicou {count} vezes
      </button>
    </div>
  )
}

export default App
