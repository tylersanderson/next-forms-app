"use client";
import { useTransition } from "react";
import { incrementLike } from "@/app/actions";
import { FaRegThumbsUp } from "react-icons/fa";

type LikeButtonProps = {
  likes: number | null;
};

export default function LikeButton(props: Readonly<LikeButtonProps>) {
  const { likes } = props;
  let [isPending, startTransition] = useTransition();

  return (
    <div className="likeButton">
      <FaRegThumbsUp
        onClick={() =>
          startTransition(async () => {
            await incrementLike(); // Call the server action
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
