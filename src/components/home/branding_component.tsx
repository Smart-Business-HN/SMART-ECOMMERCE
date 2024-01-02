import Image from "next/image";

export default function Branding() {
    return (
    <div className="container rounded-md mx-auto bg-gray-100">
        <div className="grid grid-cols-5">
            <div className="grid grid-cols-3 gap-4 border p-5 rounded-l-md items-center">
                <div className="col-span-1">
                    <Image className="mx-auto animate-fade-right" src="/assets/images/icons/car-icon.svg" height={40} width={40} alt="shipping icon"/>
                </div>
                <div className="col-span-2">
                    <h6 className="text-xs font-semibold animate-fade-left">Envio Gratuito</h6>
                    <p className="text-gray-600 text-xs mt-1 animate-fade-left">{"Compras > L. 1,000"}</p>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4 border p-5 items-center">
                <div className="col-span-1">
                    <Image className="mx-auto animate-fade-right animate-delay-[300ms]" src="/assets/images/icons/lock-icon.svg" height={25} width={25} alt="lock icon"/>
                </div>
                <div className="col-span-2">
                    <h6 className="text-xs font-semibold animate-fade-left animate-delay-[300ms]">Pago Seguro</h6>
                    <p className="text-gray-600 text-xs mt-1 animate-fade-left animate-delay-[300ms]">Link de pago BAC</p>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4 border p-5 items-center">
                <div className="col-span-1">
                    <Image className="mx-auto animate-fade-right animate-delay-[600ms]" src="/assets/images/icons/money-icon.svg" height={30} width={30} alt="money icon"/>
                </div>
                <div className="col-span-2">
                    <h6 className="text-xs font-semibold animate-fade-left animate-delay-[600ms]">Garantia</h6>
                    <p className="text-gray-600 text-xs mt-1 animate-fade-left animate-delay-[600ms]">Moneyback</p>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4 border p-5 items-center">
                <div className="col-span-1">
                    <Image className="mx-auto animate-fade-right animate-delay-[900ms]" src="/assets/images/icons/support-icon.svg" height={30} width={30} alt="support icon"/>
                </div>
                <div className="col-span-2">
                    <h6 className="text-xs font-semibold animate-fade-left animate-delay-[900ms]">Soporte</h6>
                    <p className="text-gray-600 text-xs mt-1 animate-fade-left animate-delay-[900ms]">Soporte 24/7</p>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 border p-5 rounded-r-md items-center">
                <div className="col-span-1">
                    <Image className="mx-auto animate-fade-right animate-delay-[1200ms]" src="/assets/images/icons/hand-icon.svg" height={30} width={30} alt="shipping icon"/>
                </div>
                <div className="col-span-3">
                    <h6 className="text-xs font-semibold animate-fade-left animate-delay-[1200ms]">Productos de Calidad</h6>
                    <p className="text-gray-600 text-xs mt-1 animate-fade-left animate-delay-[1200ms]">Marcas de renombre</p>
                </div>
            </div>
        </div>
    </div>)
}