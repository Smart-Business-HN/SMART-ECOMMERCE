import { HeroSliderResponse } from "@/interfaces/hero-slider/hero-slider-response.interface";
import axios from "axios";

export const getHeroSlider = async () => {
    try {
      const response: any = await axios.get('https://localhost:7211/api/v1/HeroSlider/GetAllWithCategory');
      const serializeResponse: HeroSliderResponse = response.data;
      return serializeResponse;
    } catch(error : any)
    {
      return error.toString();
    }
  }