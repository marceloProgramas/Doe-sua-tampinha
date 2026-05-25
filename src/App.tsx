import './App.css'
import { MapaColeta } from './map'

function App() {

  return (
    <>
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
