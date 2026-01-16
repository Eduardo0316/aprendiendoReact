import './App.css'
import { useCatImage } from "./hooks/useCatImage"
import { useCatFact } from './hooks/useCatFact'
import { Otro } from './components/Otro'

export function App() {
    const { fact, refreshRandomFact } = useCatFact()  
    const { imageURL } = useCatImage({ fact })

    const handleClick = async () =>{
        refreshRandomFact()
    }

    return (
        <main className="gatitosContainer">
            <button onClick={handleClick}>Get new fact</button>
            <h1>App de gatitos</h1>
            {fact && <p>{fact}</p>}
            {imageURL && <img src={imageURL} alt={`Image extracted 
                using first three words for ${fact} `} />}

            <Otro />           
        </main>        
    )
}