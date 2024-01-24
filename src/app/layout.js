import { Inter } from "next/font/google";
import "./globals.css";
import BottomNavBar from "@/components/BottomNav/BottomNavBar";
import Header from "@/components/Header/Header";
import ToastContainer from "@/components/Toast/ToastContainer";
import { ToastProvider } from "@/components/Toast/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PhysioFlow",
  description: "PhysioFlow: Streamline your practice, empower your patients",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ToastProvider>
        <body className={inter.className}>
          <Header />
          {children}
          <ToastContainer />
          <div className="w-full flex items-center justify-center absolute bottom-0 px-4 py-4 pb-2 ">
            <BottomNavBar />
          </div>
        </body>
      </ToastProvider>
    </html>
  );
}
