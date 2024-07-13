"use client";
import { useOptimistic, useTransition } from "react";
import { incrementLike } from "@/app/actions";
import { FaRegThumbsUp } from "react-icons/fa";

type LikeButtonOptimisticProps = {
  likes: number | null;
};

export default function LikeButtonOptimistic(
  props: Readonly<LikeButtonOptimisticProps>
) {
  const { likes } = props;
  let [_isPending, startTransition] = useTransition();
  const [optimisticLikes, addOptimisticLikes] = useOptimistic(
    likes ?? 0, // Default to 0 likes if null
    (state, l) => state + 1
  );

  return (
    <div className="likeButton">
      <FaRegThumbsUp
        onClick={() =>
          startTransition(async () => {
            addOptimisticLikes(1); // Optimistically increment the like count
            await incrementLike(); // Call the server action
          })
        }
      />
      <div>{Number(optimisticLikes)}</div>
    </div>
  );
}
