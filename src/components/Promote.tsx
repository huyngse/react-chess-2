import { move } from "../game";
import { PromotionType } from "../types";
type PromoteProps = {
  promotion: PromotionType;
};
const promotionPiece = ["r", "n", "b", "q"];
export default function Promote({ promotion }: PromoteProps) {
  return (
    <div className="grid grid-cols-2 bg-yellow-600 h-full w-full">
      {promotionPiece.map((piece, index) => {
        return (
          <button
            className={`${
              index % 3 === 0 ? "bg-yellow-100" : "bg-yellow-600"
            } flex justify-center items-center`}
            key={`promotion-piece-${piece}`}
            onClick={() => move(promotion.from, promotion.to, piece)}
          >
            <img
              src={`src/assets/chess-pieces/${piece}_${promotion.color}.png`}
              alt="promotion piece image"
              className="w-[70%]"
            />
          </button>
        );
      })}
    </div>
  );
}
