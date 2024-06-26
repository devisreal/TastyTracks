import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });
const clash_grotesk = localFont({
  src: "../public/fonts/ClashGrotesk-Variable.woff2",
  display: "swap",
  variable: "--font-clash",
});

export const metadata = {
  title: "Tasty Tracks",
  description: "Tasty Tracks web app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${inter.className} ${clash_grotesk.variable} ${GeistSans.variable} antialiased`}
      >
        <MantineProvider
          theme={{
            colors: {
              primary: [
                "#fff9ed",
                "#fef1d6",
                "#fddfab",
                "#fbc776",
                "#f8a43f",
                "#f68b1e",
                "#e76e0f",
                "#bf530f",
                "#984214",
                "#7b3813",
                "#421a08",
              ],
              secondary: [
                "#f4faf3",
                "#e4f5e3",
                "#c9eac8",
                "#9ed89d",
                "#6abe6a",
                "#48a948",
                "#348534",
                "#2c692d",
                "#275427",
                "#224523",
                "#0e2510",
              ],
            },
          }}
        >
          <AuthProvider>{children}</AuthProvider>
          <Toaster
            richColors
            closeButton
            position="bottom-center"
            toastOptions={{
              className: "font-geist",
              classNames: {
                toast: "text-sm sm:text-md font-bold",
                title: "text-sm sm:text-md font-bold",
                description: "text-sm sm:text-md font-bold",
              },
            }}
            style={{
              fontSize: "2.25rem", // 18px
            }}
          />
        </MantineProvider>
      </body>
    </html>
  );
}
