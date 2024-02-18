import { ChessType } from "../types";
import { getPosition, getTileColor } from "../utils/util";
import Tile from "./Tile";

type BoardProps = {
  board?: (ChessType | null)[][];
};


function getChessPosition(tileNumber: number): string {
  const { x, y } = getPosition(tileNumber);
  const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
  return letters[x] + (y + 1);
}


export default function Board({ board }: BoardProps) {
  if (board) {
    return (
      <div className="board bg-yellow-600 w-[552px] h-[552px] grid grid-cols-8">
        {board.flat().map((tile, index) => {
          return (
            <Tile
              key={`tile-${index}`}
              chess={tile}
              color={getTileColor(index)}
              position={getChessPosition(index)}
            />
          );
        })}
      </div>
    );
  }
  return "Board is missing";
}
