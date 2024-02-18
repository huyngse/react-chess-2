import { Chess } from "chess.js";
import { BehaviorSubject } from "rxjs";
import { ChessType, PromotionType } from "./types";

// const PromotionSetup = 'rnb2bnr/pppPkppp/8/4p3/7q/8/PPPP1PPP/RNBQKBNR w KQ - 1 5';
// const staleMateSetup = "4k3/4P3/4K3/8/8/8/8/8 b - - 0 78";
// const checkMateSetup = "rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3";
// const insuficcientMaterialSetup = "k7/8/n7/8/8/8/8/7K b - - 0 1";
const chess: Chess = new Chess();

type GameSubjectType = {
    board: (ChessType | null)[][];
    pendingPromotion?: PromotionType;
    isGameOver: boolean;
    turn: string;
    result?: string;
}

export const gameSubject = new BehaviorSubject<GameSubjectType>({
    board: chess.board(),
    turn: "w",
    isGameOver: false,
});

export function handleMove(from: string, to: string) {
    const promotions = chess.moves({ verbose: true }).filter(move => move.promotion);
    if (promotions.some(promotion => promotion.from == from && promotion.to == to)) {
        const pendingPromotion = { from, to, color: promotions[0].color };
        updateGame(pendingPromotion);
    }
    const { pendingPromotion } = gameSubject.getValue();
    if (!pendingPromotion) {
        move(from, to);
    }
}

export function move(from: string, to: string, promotion?: string) {
    try {
        const legalMove = chess.move({ from, to, promotion });
        console.log(legalMove);
        updateGame();
    } catch (error) {
        console.log(error);
    }
}

function updateGame(pendingPromotion?: PromotionType) {
    const isGameOver: boolean = chess.isGameOver();
    const newGame = {
        board: chess.board(),
        pendingPromotion,
        isGameOver,
        turn: chess.turn(),
        result: isGameOver ? getGameResult() : '',
    }
    localStorage.setItem("savedGame", chess.fen());
    gameSubject.next(newGame);
}

export function initGame() {
    const savedGame = localStorage.getItem("savedGame");
    if (savedGame) {
        chess.load(savedGame);
    }
    updateGame();
}

export function resetGame() {
    chess.reset();
    updateGame();
}

function getGameResult() {
    if (chess.isCheckmate()) {
        const winner = chess.turn() == "w" ? "Black" : "White";
        return `CHECKMATE - Winner - ${winner}`
    } else if (chess.isDraw()) {
        if (chess.isStalemate()) {
            return "DRAW - STALEMATE";
        } else if (chess.isThreefoldRepetition()) {
            return "DRAW - THREEFOLD REPETITON";
        } else if (chess.isInsufficientMaterial()) {
            return "DRAW - INSUFFICIENT MATERIAL";
        } else {
            return "DRAW - 50 MOVES RULE";
        }
    } else {
        return "UNKNOWN REASON";
    }
}