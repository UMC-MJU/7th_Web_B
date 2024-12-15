import { axiosInstance } from "../../apis/axios-instance";

type creditData = {
  cast:Array<{
    id:number;
    profile_path:string;
    original_name:string;
    character:string;
  }>
}

type MvId = number;

const useGetCreditMV = async (movieId : MvId) : Promise<creditData>=> {
  const { data } = await axiosInstance.get(
    `movie/${movieId}/credits?language=ko`
  );
  return data;
};

export { useGetCreditMV };
