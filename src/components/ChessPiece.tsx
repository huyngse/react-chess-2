import { ChessType } from "../types";
import { useDrag, DragPreviewImage } from "react-dnd";
type ChessPieceProps = {
  chess: ChessType;
  turn: string | undefined;
};
export default function ChessPiece({ chess, turn }: ChessPieceProps) {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    item: {
      ...chess,
    },
    type: "piece",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const imageURL = `src/assets/chess-pieces/${chess.type}_${chess.color}.png`;
  return (
    <>
      <DragPreviewImage connect={preview} src={imageURL} />
      <img
        src={imageURL}
        alt="chess piece image"
        className={`flex h-[70%] cursor-grab active:cursor-grabbing duration-1000 ${
          isDragging && "opacity-0"
        } ${turn == "b" && "-rotate-180"}`}
        ref={drag}
      />
    </>
  );
}
