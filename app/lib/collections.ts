import { getDB } from "./mongodb";

export async function statesCollection() {
  const db = await getDB();
  return db.collection("states");
}
