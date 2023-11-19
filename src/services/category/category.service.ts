import { NavCategory } from "@/interfaces/category/nav-category.interface";
import { HeroSliderResponse } from "@/interfaces/hero-slider/hero-slider-response.interface";
import axios from "axios";

export const GetAllNavCategory = async () => {
    try {
      const response: any = await axios.get(`${process.env.baseApi}/Category/GetAllNavCategory`);
      const serializeResponse: NavCategory[] = response.data.data;
      return serializeResponse;
    } catch(error : any)
    {
      return error.toString();
    }
}