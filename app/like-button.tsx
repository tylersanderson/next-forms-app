"use client";
import { useTransition } from "react";
import { incrementLike } from "@/app/actions";
import { FaRegThumbsUp } from "react-icons/fa";

export default function LikeButton({ likes }: { likes: number | null }) {
  let [isPending, startTransition] = useTransition();

  return (
    <div className="likeButton">
      <FaRegThumbsUp
        onClick={() =>
          startTransition(async () => {
            await incrementLike((likes || 0) + 1); // Call the server action
          })
        }
      />
      <div className="row">
        {Number(likes)}
        {isPending && <span>Loading...</span>}
      </div>
    </div>
  );
}
