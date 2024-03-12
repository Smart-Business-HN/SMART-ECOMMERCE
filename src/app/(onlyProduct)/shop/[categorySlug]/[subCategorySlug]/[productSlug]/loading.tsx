'use client'
import Lottie from "lottie-react";
import animation from "./loading-animation.json";
export default function Loading() {
    return (
        <div className="items-center h-screen w-screen flex justify-center mx-auto">
            <div className=" max-w-5xl -mt-52 py-0">
                <div className="h-96 w-96">
                    <Lottie animationData={animation}/>
                    
                </div>
                <p className="text-4xl text-gray">Cargando resultados</p>
            </div>
        </div>
    );
}