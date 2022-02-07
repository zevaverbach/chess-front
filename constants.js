
export const LETTER_PIECE_NAME_LOOKUP = {}
export const PIECE_NAME_LETTER_LOOKUP = {}

for (const [letter, name] of Object.entries({
    r: 'rook',
    b: 'bishop',
    q: 'queen',
    k: 'king',
    p: 'pawn',
    n: 'knight',
})) {
    LETTER_PIECE_NAME_LOOKUP[letter] = `black-${name}`
    LETTER_PIECE_NAME_LOOKUP[letter.toUpperCase()] = `white-${name}`
    PIECE_NAME_LETTER_LOOKUP[`black-${name}`] = letter
    PIECE_NAME_LETTER_LOOKUP[`white-${name}`] = letter.toUpperCase()
}

export const files = Array.from("abcdefgh")
export const STARTING_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
