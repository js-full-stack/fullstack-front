import axios from "axios";
import { flow, types } from "mobx-state-tree";
import { toast } from "react-toastify";

// !Exercise model
const ExerciseModel = types.model({
  name: types.string,
  description: types.string,
  createdAt: types.string,
  updatedAt: types.string,
  id: types.identifierNumber,
});

// !Program model
export const ProgramModel = types.model("Program", {
  name: types.string,
  description: types.string,
  price: types.number,
  duration: types.number,
  id: types.identifierNumber,
  createdAt: types.string,
  updatedAt: types.string,
  author: types.model({
    firstName: types.optional(types.string, ""),
    lastName: types.optional(types.string, ""),
    email: types.optional(types.string, ""),
    phone: types.optional(types.string, ""),
  }),
  isSubscribe: types.optional(types.boolean, false),
  exercises: types.optional(types.array(ExerciseModel), []),
});

// !PROGRAM STORE
export const ProgramStore = types
  .model({
    programs: types.array(ProgramModel),
    currentProgram: types.maybe(ProgramModel),
  })

  .actions((self) => {
    // !Get all programs
    const getAllPrograms = flow(function* () {
      const { data } = yield axios.get("/program");

      self.programs = data;
    });
    // !Add program
    const addProgram = flow(function* (name, description, price, duration) {
      try {
        const { data } = yield axios.post("/program", {
          name,
          description,
          price,
          duration,
        });

        self.programs.push(data);
      } catch (error) {
        console.log(error);
      }
    });

    // !Delete program
    const deleteProgram = flow(function* (programId: number) {
      yield axios.delete(`/program/${programId}`);
      const data: any = self.programs.filter((p) => p.id !== programId);

      self.programs = data;
    });

    const getProgramById = flow(function* (programId: number) {
      const { data } = yield axios.get(`/program/${programId}`);
      self.currentProgram = data;
    });

    const updateProgram = flow(function* (
      programId: number,
      { name, description, price, duration }
    ) {
      const { data } = yield axios.put(`/program/${programId}`, {
        name,
        description,
        price,
        duration,
      });
      console.log("data", data);
      const updatedData: any = self.programs.map((program) => {
        return program.id === programId ? data : program;
      });

      self.programs = updatedData;

      const addExerciseToProgram = flow(function* (
        programId: number,
        exerciseId: number[]
      ) {
        yield axios.post("/exercise/to-program", {
          programId,
          exerciseId,
        });
      });
    });

    const subscribeUserToProgram = flow(function* (programId: number) {
      yield axios.post("/program/subscribe/", {
        programId,
      });
      const updatedProgramStatus: any = self.programs.map((program) =>
        program.id === programId
          ? { ...program, isSubscribe: !program.isSubscribe }
          : program
      );

      self.programs = updatedProgramStatus;
    });

    const unsubscribeUserFromProgram = flow(function* (programId: number) {
      yield axios.delete(`/program/unsubscribe/${programId}`);

      const updatedProgramStatus: any = self.programs.map((program) =>
        program.id === programId
          ? { ...program, isSubscribe: !program.isSubscribe }
          : program
      );

      self.programs = updatedProgramStatus;
    });

    return {
      addProgram,
      deleteProgram,
      updateProgram,
      getProgramById,
      getAllPrograms,
      subscribeUserToProgram,
      unsubscribeUserFromProgram,
    };
  });

// !EXERCISE STORE
export const ExerciseStore = types
  .model({
    exercises: types.array(ExerciseModel),
    currentExercise: types.maybe(ExerciseModel),
  })
  .actions((self) => {
    // !Get all exercises
    const getAllExercises = flow(function* () {
      const { data } = yield axios.get("/exercise");
      self.exercises = data;
    });

    // !Add exercise
    const addExercise = flow(function* (name, description) {
      const { data } = yield axios.post("/exercise", {
        name,
        description,
      });
      self.exercises.push(data);
    });

    // ! Delete exercise
    const deleteExercise = flow(function* (exerciseId: number) {
      yield axios.delete(`/exercise/${exerciseId}`);
      const data: any = self.exercises.filter(({ id }) => id !== exerciseId);
      self.exercises = data;
    });

    // ! Get exercise by id
    const getExerciseById = flow(function* (exerciseId: number) {
      const { data } = yield axios.get(`/exercise/${exerciseId}`);
      self.currentExercise = data;
    });

    //  !Update exrrcise
    const updateExercise = flow(function* (
      exerciseId: number,
      { name, description }
    ) {
      const { data } = yield axios.put(`/exercise/${exerciseId}`, {
        name,
        description,
      });

      const updatedData: any = self.exercises.map((exercise) => {
        return exercise.id === exerciseId ? data : exercise;
      });
      self.exercises = updatedData;
    });

    return {
      addExercise,
      deleteExercise,
      getExerciseById,
      updateExercise,
      getAllExercises,
    };
  });
