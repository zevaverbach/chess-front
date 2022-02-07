import { LETTER_PIECE_NAME_LOOKUP, PIECE_NAME_LETTER_LOOKUP, files } from './constants.js'

const parseCastlingAvailability = castlingAvailability => {
    let castlingAvailabilityObj = {whiteKing: false, whiteQueen: false, blackKing: false, blackQueen: false}
    if (castlingAvailability !== "-") {
        for (const char of castlingAvailability) {
            if (char === "K") {
                castlingAvailabilityObj.whiteKing = true
            } else if (char === "Q") {
                castlingAvailabilityObj.whiteQueen = true
            } else if (char === "k") {
                castlingAvailabilityObj.blackKing = true
            } else if (char === "q") {
                castlingAvailabilityObj.blackQueen = true
            }
        }
    }
    return castlingAvailabilityObj
}

const castlingAvailabilityToFEN = castlingAvailabilityObj => {
    let FEN = ""
    if (castlingAvailabilityObj.whiteKing) {
        FEN += "K"
    }
    if (castlingAvailabilityObj.whiteQueen) {
        FEN += "Q"
    }
    if (castlingAvailabilityObj.blackKing) {
        FEN += "k"
    }
    if (castlingAvailabilityObj.blackQueen) {
        FEN += "q"
    }
    FEN = FEN || "-"
    return FEN
}

const parsePositions = positions => {
    let board = {}
    const ranks = positions.split('/')
    ranks.forEach((tokens, rankIndex) => {
        rankIndex = Math.abs(rankIndex - 7)
        let rank = rankIndex + 1
        Array.from(tokens).forEach((token, fileIndex) => {
            let parsed = parseInt(token)
            if (isNaN(parsed)) {
                let file = files[fileIndex]
                board[`${file}${rank}`] = LETTER_PIECE_NAME_LOOKUP[token]
            }
        })
    })
    return board
}

const boardToFEN = board => {
    let FEN = ""
    let blanks = 0
    let files = Array.from("abcdefgh")
    let ranks = Array.from("12345678").reverse()
    ranks.forEach((rank, rankIndex) => {
        if (rankIndex) {
            if (blanks) {
                FEN += blanks
                blanks = 0
            }
            FEN += "/"
        }
        files.forEach((file, charIndex) => {
            let cell = `${file}${rank}`
            if (board.hasOwnProperty(cell)) {
                if (blanks) {
                    // it's insane this works, JS casts `blanks` to a String
                    FEN += blanks
                    blanks = 0
                }
                FEN += PIECE_NAME_LETTER_LOOKUP[board[cell]]
            } else {
                blanks++
            }
        })
    })
    return FEN
}

export const toFEN = gameState => {
    let { 
        board, 
        whoseTurn, 
        castlingAvailability, 
        enPassantTargetSquare, 
        halfMoveClock, 
        fullMoveNum 
    } = gameState

    enPassantTargetSquare = !enPassantTargetSquare ? "-" : enPassantTargetSquare

    return [
        boardToFEN(board),
        whoseTurn[0],
        castlingAvailabilityToFEN(castlingAvailability),
        enPassantTargetSquare,
        halfMoveClock,
        fullMoveNum,
    ].join(" ")
}

export const getGameStateFromFEN = FEN => {
    // https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
    let [
        positions, 
        whoseTurn, 
        castlingAvailability,
        enPassantTargetSquare,
        halfMoveClock,
        fullMoveNum
    ] = FEN.split(" ")
    whoseTurn = whoseTurn === "w" ? "white" : "black"
    enPassantTargetSquare = enPassantTargetSquare === "-" ? null : enPassantTargetSquare
    const castlingAvailabilityObj = parseCastlingAvailability(castlingAvailability)
    fullMoveNum = parseInt(fullMoveNum)
    halfMoveClock = parseInt(halfMoveClock)
    return {
        board: parsePositions(positions),
        whoseTurn, 
        fullMoveNum, 
        halfMoveClock, 
        enPassantTargetSquare,
        castlingAvailability: castlingAvailabilityObj,
    }
}
