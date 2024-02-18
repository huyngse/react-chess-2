import { VectorType } from "../types";

export function getPosition(tileNumber: number): VectorType {
    return {
      x: tileNumber % 8,
      y: 7 - Math.floor(tileNumber / 8),
    };
  }
  
export function getTileColor(tileNumber: number): "black" | "white" {
    const pos = getPosition(tileNumber);
    return (pos.x + pos.y) % 2 == 0 ? "black" : "white";
  }
  