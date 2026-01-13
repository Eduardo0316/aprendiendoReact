import { useState } from "react"

export function TwitterFollowCard({children, formatUserName, userName = 'unknown', initialIsFollowing}){
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
    {/*La linea de arriba y estas 3 siguientes lineas son lo mismo
    state es un arreglo dnd estan los valores de la funcion useState
    por defecto se obtendra falso (parámetro de la funcion)
    y el valor para actualizar es setIsFollowing, que cambia a verdadero
    Es como un apagador, por defecto apagao, cambio encendido
    const state = useState(false)
    const isFollowing = state[0]
    const setIsFollowing = state[1]*/}

    const text = isFollowing ? 'Siguiendo' : 'Seguir'
    const buttonClassName = isFollowing
        ? 'tw-followCard-button is-following'
        : 'tw-followCard-button'

    const handleClick = () => {
        setIsFollowing(!isFollowing)
    }

    console.log('[TwitterFollowingCard] render with userName: ',userName)
    return (
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img 
                className='tw-followCard-avatar'
                src={`https://unavatar.io/${userName}`}
                alt="El avatar del mend" />
                <div className='tw-followCard-info'>
                {children}
                <span className='tw-followCard-infoUserName'>{formatUserName(userName)}</span>
                </div>
            </header>

            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                    <span className="tw-followCard-text">{text}</span>
                    <span className="tw-followCard-unfollow">Dejar de seguir</span>
                </button>
            </aside>
            </article>
    )
}