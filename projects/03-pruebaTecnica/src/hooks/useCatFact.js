import { useEffect, useState } from "react"
import { getRandomFact } from "../services/facts"

export function useCatFact() {
    const [fact, setFact] = useState()
    const refreshRandomFact = () => {
        getRandomFact().then(newFact => setFact(newFact))
    }
    //Recuperamos dato cuioso
    useEffect(refreshRandomFact, [])

    return { fact, refreshRandomFact }
}