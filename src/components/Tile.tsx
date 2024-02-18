import { useDrop } from "react-dnd";
import { ChessType, PromotionType } from "../types";
import ChessPiece from "./ChessPiece";
import { gameSubject, handleMove } from "../game";
import { useEffect, useRef, useState } from "react";
import Promote from "./Promote";

type TileProps = {
  chess: ChessType | null;
  color: "white" | "black";
  position: string;
};

export default function Tile({ chess, color, position }: TileProps) {
  const [promotion, setPromotion] = useState<PromotionType>();
  const turnRef = useRef<string>();
  const [, drop] = useDrop(
    () => ({
      accept: "piece",
      drop: (item) => {
        const dropPiece = item as ChessType;
        const fromPosition = dropPiece.square;
        handleMove(fromPosition, position);
      },
    }),
    []
  );
  useEffect(() => {
    const subscribe = gameSubject.subscribe((game) => {
      turnRef.current = game.turn;
      if (game.pendingPromotion && game.pendingPromotion.to == position) {
        setPromotion(game.pendingPromotion);
      } else {
        setPromotion(undefined);
      }
    });
    return () => {
      subscribe.unsubscribe();
    };
  }, [position]);

  return (
    <span
      className={`${
        color == "white" && "bg-yellow-100"
      } h-[69px] flex justify-center items-center`}
      ref={drop}
    >
      {promotion && <Promote promotion={promotion} />}
      {!promotion && chess && <ChessPiece chess={chess} turn={turnRef.current}/>}
    </span>
  );
}
