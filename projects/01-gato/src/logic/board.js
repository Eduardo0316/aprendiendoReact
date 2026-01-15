import { WINNER_COMBOS } from "../constants.jsx"

export const checkWinnerFrom = (boardToCheck) =>{
    for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo
        if (
        //Si la primer, segunda y tercera pos. tienen
        //el mismo caracter es pq gana
        boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
        ) {
        return boardToCheck[a]
        }
    }
    //Si no hay ganador
    return null
}

export const checkEndGame = (newBoard) => {
    //Revisamos si hay empate, espacios vacios
    return newBoard.every((square) => square !== null)
  }