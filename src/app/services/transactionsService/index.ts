import { create } from "./create";
import { createMany } from "./createMany";
import { getAll } from "./getAll";
import { remove } from "./remove";
import { update } from "./update";
import { removeMany } from "./removeMany";

export const transactionsService = {
  create,
  createMany,
  getAll,
  update,
  remove,
  removeMany,
};
