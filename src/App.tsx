import './App.css'
import { MapaColeta } from './map'

function App() {

  return (
    <>
    <div className='header-bar'>
      <div>
        <img src="./Tampinha.png" alt="tampa" className='tampinha' />
        <h1>Doe sua tampinha</h1>
      </div>
      <a href='https://www.instagram.com/casathaienny'><img src="casa.jpg" alt="" /></a>
    </div>
    <div className='sobre'>
      <div>
        <h2>Para que são as tampinhas</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac urna et risus vestibulum commodo non at sapien. Vivamus vulputate magna non nibh tristique, eu aliquam nunc dapibus. Mauris sed erat arcu. Quisque consequat dui sit amet mi sagittis condimentum. Phasellus efficitur sapien ante, eu fermentum mi mollis non. Curabitur pretium dignissim tristique. Ut dapibus justo est, id aliquet felis malesuada sit amet. Donec libero ante, sagittis quis urna ut, vehicula rutrum arcu. Phasellus ipsum neque, mattis finibus quam id, pulvinar dictum nisi. Suspendisse quis ante sed lectus congue fringilla. Nam nec purus sem. Curabitur tincidunt molestie malesuada.
        </p>
      </div>
      <img src="./Tampas.jpg" alt="foto das tampinhas" />
    </div>
    <div className='fundo'>
      <h2>Local mais proximo para entregar suas tampinhas:</h2>
      <div className='mapa'>
        <MapaColeta />
      </div>
    </div>
    </>
  )
}

export default App
