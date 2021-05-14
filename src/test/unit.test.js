import { mapExercisesToChart } from '../redux/exercise/exercise.utils';
import { defaultExercises } from '../redux/exercise/exercise.data';

describe('unit test', () => {
  test('mapExercisesToChart: map valid array', () => {
    expect(mapExercisesToChart(defaultExercises))
      .toEqual([
        {
          sets: 2,
          reps: 3,
          day: '2021-05-01',
        },
        {
          sets: 1,
          reps: 2,
          day: '2021-05-03',
        },
        {
          sets: 0,
          reps: 0,
          day: '2021-05-19',
        },
        {
          sets: 1,
          reps: 1,
          day: '2021-06-01',
        },
      ]);
  });
  test('mapExercisesToChart: map an empty array', () => {
    expect(mapExercisesToChart([]))
      .toEqual([]);
  });
});
