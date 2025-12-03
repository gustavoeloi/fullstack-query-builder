import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  await knex("courses").insert([
    { name: "HTML" },
    { name: "CSS" },
    { name: "JavaScript" },
    { name: "NodeJS" },
    { name: "React" },
    { name: "GItHub" },
    { name: "Angular" },
    { name: "Java" },
    { name: "C#" },
    { name: "Linux" },
    { name: "DevOps" },
    { name: "AWS" },
  ]);
}
