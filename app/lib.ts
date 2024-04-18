// Needed in actions.ts to create table
// CREATE TABLE todos (
//   id SERIAL PRIMARY KEY,
//   text TEXT NOT NULL
// );

// Needed in actions.ts to created row for the first time
// export async function incrementLikeFirst(likes: number) {
//   // Check if a row with id = 1 exists
//   let result = await sql`
//   SELECT count
//   FROM likes
//   WHERE id = 1
// `;

//   // If the row doesn't exist, insert it
//   if (!result.length) {
//     await sql`
//     INSERT INTO likes (id, count)
//     VALUES (1, 0)
//   `;
//   }

//   // Increment the count value
//   await sql`
//   UPDATE likes
//   SET count = count + 1
//   WHERE id = 1
// `;
//   revalidatePath("/");
// }

// Needed in page.tsx if db does not exist
//   await sql`
//     CREATE TABLE IF NOT EXISTS todos (
//       id SERIAL PRIMARY KEY,
//       text TEXT NOT NULL
//     )
//   `;

//   await sql`
//   CREATE TABLE IF NOT EXISTS likes (
//     id SERIAL PRIMARY KEY,
//     count INTEGER NOT NULL DEFAULT 0
//   )
// `;
