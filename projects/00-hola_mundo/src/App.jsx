import { useState } from 'react';
import './App.css';
import { TwitterFollowCard } from './TwitterFollowCard.jsx';

const users = [
  {
    userName: 'TMCHein',
    name: 'Tomas',
    isFollowing: false
  },
  {
    userName: 'PacoHdezs',
    name: 'PacoWeb',
    isFollowing: true
  },
  {
    userName: 'minudev',
    name: 'Devo',
    isFollowing: true
  }
]

export function App () {
  const format = (userName) => `@${userName}`
  const [name, setName] = useState('midudev')
  const mend = { userName: name, formatUserName: format, initialIsFollowing: false }
  const changeName = () =>{
    setName('pedromichel')
  }
  
  return(
    <section className='App'>
      <TwitterFollowCard {...mend}> {/*Esta no es una buena practica
      a menos que el objeto sea demasiado grande*/}
        <strong>Eduardo Garcia Mendoza</strong>
      </TwitterFollowCard>

      {/*Idealmente esto es lo que se debe hacer, pasar los parámetros en el componente*/}
      <TwitterFollowCard formatUserName={format} initialIsFollowing>
        <strong>Edgar Mora</strong>  
      </TwitterFollowCard>

      <button onClick={changeName}>
        Cambio nombre
      </button>

      {
        users.map(user => {
          const { userName, name, isFollowing} = user
          return (
            <TwitterFollowCard
            userName={userName}
            initialIsFollowing={isFollowing}
            >
              {name}
            </TwitterFollowCard>
          )
        }

        )
      }
    </section>
  )
} 