'use client'
import { ShareIcon } from "@heroicons/react/24/outline";
import toast from 'react-hot-toast';
export default function ShareButton(props: { url: string }) {
  function copyOnClickboard() {
    navigator.clipboard.writeText(props.url);
    toast.success('El producto fue copiado a tu porta papeles con exito', {
      position: 'top-right',
      className: 'text-xs mt-10'
    })
  }
  return (<div onClick={() => copyOnClickboard()} className='grow flex gap-2 p-2 justify-center rounded-r-md items-center cursor-pointer hover:bg-gray-200 border-gray-500'>
    <ShareIcon className="text-gray-600" height={20} width={20} />
    <p className="text-gray-600">Compartir</p>
  </div>);
}