import { Color, PieceSymbol, Square } from "chess.js";

export type ChessType = {
  square: Square;
  type: PieceSymbol;
  color: Color;
};

export type VectorType = {
  x: number;
  y: number;
}
export type PromotionType = {
  from: string;
  to: string;
  color: Color;
}