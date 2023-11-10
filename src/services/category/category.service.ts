import { NavCategory } from "@/interfaces/category/nav-category.interface";
import { HeroSliderResponse } from "@/interfaces/hero-slider/hero-slider-response.interface";
import axios from "axios";

export const GetAllNavCategory = async () => {
    try {
      const response: any = await axios.get('https://localhost:7211/api/v2/Category/GetAllNavCategory');
      const serializeResponse: NavCategory[] = response.data.data;
      return serializeResponse;
    } catch(error : any)
    {
      return error.toString();
    }
}