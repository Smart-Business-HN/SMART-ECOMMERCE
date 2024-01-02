import Footer from "@/components/main-layout/foother";
import Navbar from "@/components/main-layout/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar/>
            {children}
            <Footer/>
        </>
       
    )
}