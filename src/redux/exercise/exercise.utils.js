export const mapExercisesToChart = (exercises) => exercises.map(
  (exercise) => {
    const { attributes: { sets, reps, routine: { day } } } = exercise;

    return {
      day,
      sets,
      reps,
    };
  },
);

export const ivancito = () => 'ivancito';
