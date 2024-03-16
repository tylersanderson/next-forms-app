"use client";
import { useOptimistic, useTransition } from "react";
import { incrementLike } from "@/app/actions";
import { FaRegThumbsUp } from "react-icons/fa";

export default function LikeButton({ likes }: { likes: number | null }) {
  let [isPending, startTransition] = useTransition();
  const [optimisticLikes, addOptimisticLikes] = useOptimistic(
    likes || 0, // Default to 0 likes if null
    (state, l) => state + 1
  );

  console.log({ likes, optimisticLikes });

  return (
    <div className="likeButton">
      <FaRegThumbsUp
        onClick={() =>
          startTransition(async () => {
            addOptimisticLikes(1); // Optimistically increment the like count
            await incrementLike(optimisticLikes); // Call the server action
          })
        }
      />
      <span className="text-sm opacity-60">{Number(optimisticLikes)}</span>
    </div>
  );
}
