import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'

ReactDOM.createRoot(document.getElementById('root')!).render( /*colocamos um ! logo após o root para o ts saber que esse elemento ali vai existir, que é pra ele confiar, mas não é uma solução ideal.*/
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
