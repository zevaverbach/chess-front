import { LETTER_PIECE_NAME_LOOKUP, STARTING_FEN } from './constants.js'
import { getGameStateFromFEN, toFEN } from './fen.js'

const GREEN = "#779558"
const BEIGE = "#eeedd3"
const board = document.getElementById("board")

let gameState = {}

const renderBoard = (fromPerspective = "white")  => {
    // adapted from https://codepen.io/Staghouse/pen/OzpVya
    let lastColor = BEIGE
    let files = Array.from("abcdefgh")
    let ranks = Array.from("12345678")
    if (fromPerspective === "white") {
        ranks.reverse()
    } else {
        files.reverse()
    }
    ranks.forEach(num => {
        files.forEach((char, charIndex) => {
            if (charIndex % 7 || charIndex > 0) {
                lastColor = lastColor === BEIGE ? GREEN : BEIGE
            }
            const box = document.createElement("div")
            box.classList.add("box")
            box.id = `${char}${num}`
            box.style.backgroundColor = lastColor
            board.appendChild(box)
        })
    })
}

const initializeGameState = () => {
    gameState = getGameStateFromFEN(STARTING_FEN)
}

const renderPieces = () => null

const initializeGame = () => {
    renderBoard()
    initializeGameState()
    renderPieces()
    console.log(gameState)
    console.log(toFEN(gameState))
    console.log(toFEN(gameState) === STARTING_FEN)
    console.log(STARTING_FEN)
}
document.addEventListener("DOMContentLoaded", initializeGame)
