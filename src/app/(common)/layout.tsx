import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 px-8 mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10 2xl:mx-72">
        <div className="">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}