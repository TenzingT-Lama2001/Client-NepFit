import axios from "../utils/axios";
export const getWorkouts = async () => {
  const { data } = await axios.get(`/api/trainer/workouts`, {});

  return data.data;
};

export const deleteWorkout = async (id: string) => {
  const { data } = await axios.delete(`/api/trainer/workouts/${id}`);
  return data;
};

export const updateWorkout = async (id: string, workouts: any) => {
  const { data } = await axios.patch(`/api/trainer/workouts/${id}`, workouts);
  return data;
};

export const createWorkout = async (workouts: any) => {
  const { data } = await axios.post(`/api/trainer/workouts`, workouts);
  return data;
};

export const getOneWorkout = async (id: string) => {
  const { data } = await axios.get(`/api/trainer/workouts/${id}`);
  return data.data;
};

export const getWorkoutByTrainerId = async (trainerId: string) => {
  const { data } = await axios.get(
    `/api/trainer/workouts/${trainerId}/workout`
  );
  return data.data;
};
