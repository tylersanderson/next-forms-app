import postgres from "postgres";

import { AddForm } from "@/app/add-form";
import { DeleteForm } from "@/app/delete-form";
import LikeButton from "@/app/like-button";

let sql = postgres(process.env.DATABASE_URL || process.env.POSTGRES_URL!, {
  ssl: "prefer",
});

export default async function Home() {
  await sql`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      text TEXT NOT NULL
    )
  `;

  await sql`
  CREATE TABLE IF NOT EXISTS likes (
    id SERIAL PRIMARY KEY,
    count INTEGER NOT NULL DEFAULT 0
  )
`;

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
      <LikeButton likes={likes[0]?.count} />
    </main>
  );
}
