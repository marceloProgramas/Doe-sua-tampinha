import './App.css'
import { MapaColeta } from './map'

function App() {

  return (
    <>
    <div className='header-bar'>
      <img src="./Tampinha.png" alt="tampa" className='tampinha' />
      <h1>barra de cima</h1>
    </div>
    <div className='fundo'>
      <p>local mais proximo para entregar suas tampinhas:</p>
      <div className='mapa'>
        <MapaColeta />
      </div>
    </div>
    </>
  )
}

export default App
