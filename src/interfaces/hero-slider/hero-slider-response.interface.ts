import { HeroSlider } from "./hero-slider.interface"

export interface HeroSliderResponse {
    id: number
    name: string
    image: string
    position: number
    heroSliders: HeroSlider[]
  }