import Footer from "./_components/footer";
import Navbar from "./_components/navbar";

//
interface GuestLayoutProps {
    children: React.ReactNode;
}

//
export default function GuestLayout({ children }: GuestLayoutProps) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
