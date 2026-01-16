import { useEffect, useState } from "react"

export function useCatImage({ fact }) {
    console.log(fact)
    const [imageURL, setImageURL] = useState()
    
    useEffect(() => {
        if(!fact) return
        const firstWord = fact.split(' ', 2).join(' ')

        fetch(`https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`)
        .then(res => res.json())
        .then(response => {
            const { url } = response
            setImageURL(url)
        })
    }, [fact])

    return { imageURL }
}