import Link from "next/link";
import Image from "next/image";

export default function HeroComponent() {
    return (
      <div className="w-full sm:px-4">
        <div
          className="bg-cover w-full px-4 sm:px-0 sm:mx-auto container my-4 h-96 border-2 rounded-3xl hover:border-blue-400 border-[#F6F6F8] "
          style={{
            backgroundImage: `url('/images/corporate/landing_smart_business_background.webp')`,
          }}
        >
          <div className="grid h-full grid-cols-2">
            <div className="col-span-2 md:col-span-1 h-full align-middle py-28 justify-center  text-center relative">
              <h4 className="text-3xl font-semibold text-black text-opacity-70 animate-fade-down">
                Somos tus aliados<br></br> Tecnologicos
              </h4>
              <div className="flex justify-center animate-fade-down">
                <Link href="/contacto">
                  <div className="p-2 rounded-xl text-blue-600 font-semibold">
                    Contactanos
                  </div>
                </Link>
              </div>
              <div className="  bottom-2 left-0 flex justify-center gap-4 animate-fade-down">
                <Image
                  alt="icono de unifi"
                  src="/images/corporate/unifi-icon-smart-business.png"
                  height={40}
                  width={40}
                />
                {/* <Image priority alt="icono de hikvsion"   src='/images/corporate/Hikvision_logo_smart_business.png' height={30} width={250}/> */}
                <Image
                  alt="icono de mikrotik"
                  src="/images/corporate/mikrotik-logo.png"
                  height={30}
                  width={220}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}