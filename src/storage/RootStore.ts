import { applySnapshot, types } from "mobx-state-tree";
import { AuthStore } from "./AuthStore";
import { ProgramStore, ExerciseStore } from "./ProgramsStore";

export const RootStore = types.model("Root", {
  auth: types.optional(AuthStore, {}),
  program: types.optional(ProgramStore, {}),
  exercise: types.optional(ExerciseStore, {}),
});
