import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main className="flex-grow pt-20 sm:pt-24">{children}</main>
            <Footer />
        </>
    );
}
