import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square.jsx"
import { TURNS } from "./constants.jsx"
import { checkWinnerFrom, checkEndGame } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"
import { resetGameStorage, saveGameToStorage } from "./logic/saveGame/index.js"

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnLocalStorage = window.localStorage.getItem('turn')
    return turnLocalStorage ?? TURNS.X
  })
  //null no hay ganador false hay empate
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    //Solo reinicia los estados iniciales
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (index) => {
    //Si ya tiene escrito algo ya no escribe
    if (board[index] || winner) return

    //Actualiza el tablero
    const newBoard = [...board]
    newBoard[index] = turn // x u o
    setBoard(newBoard)

    //cambia el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //Guardar partida
    saveGameToStorage({board: newBoard, turn: newTurn})

    //revisar si no hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner) {
      setWinner(newWinner)
      confetti()
    } //Si no encuentra ganador y termina juego es empate
    else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }
  return ( 
    <main className="board">
        <h1>Gato</h1>
        <button onClick={resetGame}>Reiniciar el juego</button>
        <section className="game">
          {
            board.map((_, index) => {
              return (
                <Square 
                key={index}
                index={index}
                updateBoard={updateBoard}
                >
                  {board[index]}
                </Square>
              )
            })
          }
        </section>

        <section className="turn">
          <Square isSelected = {turn === TURNS.X}>
            {TURNS.X}
          </Square>
          <Square isSelected = {turn === TURNS.O}>
            {TURNS.O}
          </Square>
        </section>

        <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
