'use client'
import Image from 'next/image';
import React, { Fragment, useState } from 'react'

export default function CategoriesComponent() {
    const [selectedCategory, setSelectedCategory] = useState(0);
    let elements:any = [
        {
            name: "Switches",
            image: "https://assets.ecomm.ui.com/_next/static/media/icon-switching.a13c7521.svg",
            childs: [
                {
                    id: 2,
                    name:"USW-24-POE",
                    slug:"usw-24-poe",
                    status: "En stock",
                    image: "https://m.media-amazon.com/images/I/61S8f3rAYFL._AC_SL1500_.jpg",
                    description: "Loren ipsum et dolor in sapiem"
                },
                {
                    id: 2,
                    name:"USW-24-POE",
                    slug:"usw-24-poe",
                    status: "Por Pedido",
                    image: "https://m.media-amazon.com/images/I/61S8f3rAYFL._AC_SL1500_.jpg",
                    description: "Loren ipsum et dolor in sapiem"
                },
                {
                    id: 2,
                    name:"USW-24-POE",
                    slug:"usw-24-poe",
                    status: "Disponible",
                    image: "https://m.media-amazon.com/images/I/61S8f3rAYFL._AC_SL1500_.jpg",
                    description: "Loren ipsum et dolor in sapiem"
                },
                {
                    id: 2,
                    name:"USW-24-POE",
                    slug:"usw-24-poe",
                    status: "Disponible",
                    image: "https://m.media-amazon.com/images/I/61S8f3rAYFL._AC_SL1500_.jpg",
                    description: "Loren ipsum et dolor in sapiem"
                },
                {
                    id: 2,
                    name:"USW-24-POE",
                    slug:"usw-24-poe",
                    status: "En stock",
                    image: "https://m.media-amazon.com/images/I/61S8f3rAYFL._AC_SL1500_.jpg",
                    description: "Loren ipsum et dolor in sapiem"
                },
            ]
        },
        {
            name: "Wifi Empresarial",
            image: "https://assets.ecomm.ui.com/_next/static/media/icon-switching.a13c7521.svg"
        },
        {
            name: "CCTV",
            image: "https://assets.ecomm.ui.com/_next/static/media/icon-switching.a13c7521.svg"
        },
        {
            name: "UPS",
            image: "https://assets.ecomm.ui.com/_next/static/media/icon-switching.a13c7521.svg"
        },
        {
            name: "Control de Acceso",
            image: "https://assets.ecomm.ui.com/_next/static/media/icon-switching.a13c7521.svg"
        },
    ];


    function SingleCategoryButton(object:any,index:number) {
        return (
          <div key={index} className={ index==selectedCategory ? "bg-gray-100 ":""+'bg-white cursor-pointer hover:bg-gray-100 rounded-md px-2 py-1 '}>
                  <div className='flex justify-center'>
                      <Image src={object.image.toString()} alt="SWITCH" width={100} height={50}/>
                  </div>
                  <div className='w-full mx-auto text-center font-regular'>
                      <p>{object.name}</p>
                  </div>
          </div>
        )
    }

  return (
    <div className='w-full mx-auto'>
        <div className='container flex space-x-3 justify-center w-full   mx-auto'>
            {
                elements.map((item:any,i:number)=>{
                    return(SingleCategoryButton(item,i))
                })
            }
        </div>
        <div className='container mt-4 flex space-x-3 justify-between w-full  mx-auto'>
            {
                elements[selectedCategory].childs.map((item:any,i:number)=>{
                    return(SingleProductCategory(item));
                })
            }
        </div>
    </div>
  )
}

function SingleProductCategory(props:any) {
  return (
    <div className='py-2 px-4 rounded-xl bg-[#F6F6F8] hover:shadow-xl '>
        <div className='py-10 flex justify-center'>
            <Image src={props.image} width={200} height={40} alt={props.name}/>
        </div>
        <div className='mb-10'>
            <h6 className='text-center font-semibold'>
                {props.name}
            </h6>
            <p className="text-gray-500 text-xs">SKU: USW-24-POE</p>
            <p className="text-gray-500 mt-4">{props.description}</p>
        </div>
        <div className='flex justify-between relative'>
            <div>
                <button className='text-xs text-white bg-blue-600 hover:bg-blue-700 py-2 px-2 font-semibold rounded-md'>Agregar al carrito</button>
            </div>
            <div className='bg-green-500 absolute right-0 bottom-0 py-1 px-2 rounded-xl'>
                <p className='font-normal text-xs text-white'>
                {props.status}
                </p>
            </div>

        </div>
    </div>
  )
}






