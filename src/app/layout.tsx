import { RootProvider } from "fumadocs-ui/provider/next";
import "./global.css";
import { Geist_Mono, Manrope } from "next/font/google";

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
    display: "swap",
});

const geistMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-geist-mono",
    display: "swap",
});

export default function Layout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en" className={`${manrope.variable} ${geistMono.variable}`} suppressHydrationWarning>
            <body className="flex min-h-screen flex-col">
                <RootProvider
                    theme={{
                        defaultTheme: "system",
                        enableSystem: true,
                        disableTransitionOnChange: false,
                    }}
                >
                    {children}
                </RootProvider>
            </body>
        </html>
    );
}
