import express, { Request, Response } from "express";

import { knex } from "./database/knex";

const app = express();
app.use(express.json());

app.post("/courses", async (request: Request, response: Response) => {
  const { name } = request.body;

  try {
    await knex("courses").insert({ name });
    return response.status(201).send({ message: "Course inserted" });
  } catch (error) {
    console.log("Error inserting course: ", error);
    throw error;
  }
});

app.get("/courses", async (request: Request, response: Response) => {
  try {
    const courses = await knex("courses").select("*");

    return response.status(200).json(courses);
  } catch (error) {
    console.log("Error fetching courses:", error);
    return response.status(500).json({ error: "Failed to fetch courses" });
  }
});

app.put("/courses/:id", async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const { name } = request.body;

    await knex("courses")
      .where("id", id)
      .update({ name, updated_at: knex.fn.now() });

    return response.status(200).json({ message: "Course updated!" });
  } catch (error) {
    console.log("Error updating course: ", error);
    return response.status(500).json({ error: "Failed to update course" });
  }
});

app.delete("/courses/:id", async (request: Request, response: Response) => {
  const { id } = request.params;

  try {
    await knex("courses").delete().where("id", id);
    return response.status(204).json();
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: "Failed to delete course" });
  }
});

app.get("/courses/modules", async (request: Request, response: Response) => {
  try {
    const modules = await knex("course_modules").select("*");
    return response.status(200).json(modules);
  } catch (error) {
    console.log("Error on fetch modules", error);
    return response.status(500).json({ error: "Failed to fetch modules" });
  }
});

app.post("/courses/modules", async (request: Request, response: Response) => {
  const { name, course_id } = request.body;
  try {
    await knex("course_modules").insert({ name, course_id });
    return response.status(201).json({ message: "Module created!" });
  } catch (error) {
    console.log("Error on create module", error);
    return response.status(500).json({ error: "Failed to create module" });
  }
});

app.get("/course/:id/modules", async (request: Request, response: Response) => {
  const { id } = request.params;

  try {
    const courses = await knex("courses")
      .select(
        "courses.id AS course_id",
        "course_modules.id AS module_id",
        "course_modules.name AS module",
        "courses.name AS course"
      )
      .where("course_id", id)
      .join("course_modules", "courses.id", "course_modules.course_id");

    return response.status(200).json(courses);
  } catch (error) {
    console.log("Error on fetch course", error);
    return response.status(500).json({ error: "Failed to fetch course" });
  }
});

app.listen(3333, () => console.log(`Server is running on port 3333`));
