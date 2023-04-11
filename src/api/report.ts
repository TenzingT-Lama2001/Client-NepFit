import axios from "../utils/axios";
export const getMembersByTrainerId = async (trainerId: string) => {
  const { data } = await axios.get(`/api/report/members`, {
    params: {
      trainerId,
    },
  });

  return data.data;
};

export const createReport = async (reportData: any) => {
  const { data } = await axios.post(`/api/report`, reportData);
  return data;
};

export const getReports = async () => {
  const { data } = await axios.get(`/api/report`);
  return data;
};
export const getReportByMemberId = async (memberId: string) => {
  const { data } = await axios.get(`/api/report/`, {
    params: {
      memberId,
    },
  });
  return data;
};
