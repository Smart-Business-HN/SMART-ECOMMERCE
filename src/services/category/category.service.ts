import { NavCategory } from "@/interfaces/category/nav-category.interface";
import { axiosCustom } from "@/utils/axios-helper";

export const GetAllNavCategory = async () => {
    try {
      const response: any = await axiosCustom.get(`${process.env.BASEAPI}/Category/GetAllNavCategory`);
      const serializeResponse: NavCategory[] = response.data.data;
      return serializeResponse;
    } catch(error : any)
    {
      return error.toString();
    }
}