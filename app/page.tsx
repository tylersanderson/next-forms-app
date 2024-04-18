import postgres from "postgres";

import { AddForm } from "@/app/add-form";
import { DeleteForm } from "@/app/delete-form";
import LikeButton from "@/app/like-button";
import LikeButtonOptimistic from "@/app/like-button-optimistic";
import { FaLongArrowAltLeft } from "react-icons/fa";

let sql = postgres(process.env.DATABASE_URL || process.env.POSTGRES_URL!, {
  ssl: "prefer",
});

export default async function Home() {
  let todos = await sql`SELECT * FROM todos`;

  let likes = await sql`
  SELECT count 
  FROM likes 
  WHERE id = 1
`;

  return (
    <main>
      <h1 className="sr-only">Todos</h1>
      <AddForm />
      <ul className="list">
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <DeleteForm id={todo.id} todo={todo.text} />
          </li>
        ))}
      </ul>
      <div className="likeButtons">
        <LikeButton likes={likes[0]?.count} />
        <div className="optimistic">
          <LikeButtonOptimistic likes={likes[0]?.count} />
          <FaLongArrowAltLeft className="arrow" />
          {` Optimistic`}
        </div>
      </div>
    </main>
  );
}
