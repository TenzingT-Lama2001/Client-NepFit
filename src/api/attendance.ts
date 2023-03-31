import axios from "../utils/axios";

// export const updateWorkout = async (id: string, workouts: any) => {
//   const { data } = await axios.patch(`/api/trainer/workouts/${id}`, workouts);
//   return data;
// };

export const createAttendance = async (attendance: any) => {
  const { data } = await axios.post(`/api/attendance`, attendance);
  console.log("createAttendance", data);
  return data;
};

export const getMembersFromMembership = async ({
  page,
  limit,
  searchQuery,
  sortBy,
  order,
}: any) => {
  const { data } = await axios.get(`/api/attendance/membership`, {
    params: {
      pageNumber: page,
      pageSize: limit,
      searchQuery,
      sortBy,
      order,
    },
  });

  return data.data;
};

export const getAttendance = async (date: Date) => {
  const formattedDate = date.toISOString().split("T")[0];
  const { data } = await axios.get(`/api/attendance`, {
    params: {
      date: formattedDate,
    },
  });
  console.log("api", data.data);

  return data.data;
};
