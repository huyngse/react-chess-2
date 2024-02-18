import { useEffect, useRef, useState } from "react";
import { gameSubject, initGame, resetGame } from "./game";
import Board from "./components/Board";
import { ChessType } from "./types";

function App() {
  const [board, setBoard] = useState<(ChessType | null)[][]>();
  const [isGameOver, setIsGameOver] = useState(false);
  const resultRef = useRef<string | undefined>();
  const turnRef = useRef<string>();
  useEffect(() => {
    initGame();
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board);
      setIsGameOver(game.isGameOver);
      resultRef.current = game.result;
      turnRef.current = game.turn;
    });
    return () => {
      subscribe.unsubscribe();
    };
  }, []);

  const snow = [];
  for (let index = 0; index < 30; index++) {
    snow.push(<div className="snow" key={`snow-${index}`}></div>);
  }
  return (
    <div className="h-screen relative overflow-hidden">
      {snow}
      <div className="h-screen bg-yellow-950 flex items-center justify-center">
        <div className="flex justify-center gap-5">
          <div className={`${turnRef.current == "w" ? "" : "rotate-180"} duration-[20000ms]`}>
            <Board board={board} />
          </div>
          <div
            className={` p-5 w-[400px] flex items-center justify-center flex-col ${
              turnRef.current == "w" ? "bg-white" : "bg-black text-white"
            } duration-300`}
          >
            <div className="font-bold">
              {!isGameOver &&
                (turnRef.current == "w" ? "White's turn" : "Black's turn")}
            </div>

            {isGameOver && (
              <div className="text-center">
                <div className="font-bold">GAME OVER</div>
                <div className="pb-2">{resultRef.current}</div>
                <button
                  className="text-sm border-2 border-orange-700 bg-orange-700 text-white p-1 hover:text-white hover:bg-orange-600 active:bg-orange-500 rounded-2xl px-2"
                  onClick={() => resetGame()}
                >
                  NEW GAME
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
