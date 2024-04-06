"use server";

import { revalidatePath } from "next/cache";
import postgres from "postgres";
import { z } from "zod";

let sql = postgres(process.env.DATABASE_URL || process.env.POSTGRES_URL!, {
  ssl: "prefer",
});

// CREATE TABLE todos (
//   id SERIAL PRIMARY KEY,
//   text TEXT NOT NULL
// );

export async function createTodo(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const schema = z.object({
    todo: z.string().min(1),
  });
  const parse = schema.safeParse({
    todo: formData.get("todo"),
  });

  if (!parse.success) {
    return { message: "Failed to create todo" };
  }

  const data = parse.data;

  try {
    await sql`
      INSERT INTO todos (text)
      VALUES (${data.todo})
    `;

    revalidatePath("/");
    return { message: `Added todo ${data.todo}` };
  } catch (e) {
    return { message: "Failed to create todo" };
  }
}

export async function deleteTodo(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const schema = z.object({
    id: z.string().min(1),
    todo: z.string().min(1),
  });
  const data = schema.parse({
    id: formData.get("id"),
    todo: formData.get("todo"),
  });

  try {
    await sql`
      DELETE FROM todos
      WHERE id = ${data.id};
    `;

    revalidatePath("/");
    return { message: `Deleted todo ${data.todo}` };
  } catch (e) {
    return { message: "Failed to delete todo" };
  }
}

export async function incrementLike(likes: number) {
  // Check if a row with id = 1 exists
  let result = await sql`
  SELECT count 
  FROM likes 
  WHERE id = 1
`;

  // If the row doesn't exist, insert it
  // if (!result.length) {
  //   await sql`
  //   INSERT INTO likes (id, count)
  //   VALUES (1, 0)
  // `;
  // }

  // Increment the count value
  await sql`
  UPDATE likes
  SET count = count + 1
  WHERE id = 1
`;
  revalidatePath("/");
}
