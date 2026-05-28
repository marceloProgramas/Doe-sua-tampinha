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
          As tampinhas plásticas doadas são recicladas e transformadas em recursos financeiros fundamentais para o Instituto Casa Thaienny. O valor arrecadado com a venda desses materiais é totalmente revertido para o custeio de exames, medicamentos, tratamentos e todo o suporte essencial dado às famílias acolhidas. Assim, um pequeno objeto que iria para o lixo vira um gesto concreto de solidariedade, ajudando a manter as portas da Casa abertas.
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
