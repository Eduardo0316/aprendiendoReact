import { useEffect, useState } from "react"
import './App.css'

export function App() {
    const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
    //const CAT_ENDPOINT_IMAGE_URL= `https://cataas.com/cat/says/${firstWord}?sizze=50&color=red&json=true`
    const CAT_PREFIX = 'https://cataas.com'
    const [fact, setFact] = useState()
    const [imageURL, setImageURL] = useState()

    useEffect(() => {
        if(!fact) return
        const firstWord = fact.split(' ', 3).join('')

        fetch(`https://cataas.com/cat/says/${firstWord}?size=40&color=red&json=true`)
        .then(res => res.json())
        .then(response => {
            const { url } = response
            setImageURL(url)
        })
    }, [fact])

    //Recuperamos dato cuioso
    useEffect(() => {
        fetch(CAT_ENDPOINT_RANDOM_FACT)
        .then(res => res.json())
        .then(data => {
            const { fact } = data
            setFact(fact)
        })
    }, [])

    return (
        <main className="gatitosContainer">
            <h1>App de gatitos</h1>
            {fact && <p>{fact}</p>}
            {imageURL && <img src={`${imageURL}`} alt={`Image extracted 
                using first three words for ${fact} `} />}           
        </main>        
    )
}