import { knex as knexConfig } from "knex";
import knexfile from "../../knexfile";

export const knex = knexConfig(knexfile);
