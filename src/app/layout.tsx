import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { AuthProvider } from "@/context/AuthContext";
import { getSiteUrl } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SportsHub — Your World of Sports, All in One Place",
    template: "%s | SportsHub",
  },
  description:
    "Discover live sports, events, and categories from leagues across the country and beyond.",
  metadataBase: getSiteUrl(),
  alternates: { canonical: "/" },
  openGraph: {
    title: "SportsHub — Your World of Sports, All in One Place",
    description:
      "Discover live sports, events, and categories from leagues across the country and beyond.",
    type: "website",
    images: [
      {
        url: "/thumbnail.png",
        alt: "SportsHub — Your World of Sports, All in One Place",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SportsHub — Your World of Sports, All in One Place",
    description:
      "Discover live sports, events, and categories from leagues across the country and beyond.",
    images: ["/thumbnail.png"],
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storedTheme = localStorage.getItem('sportshub-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (storedTheme === 'dark' || (!storedTheme && prefersDark) || !storedTheme) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-zinc-100 selection:bg-emerald-500 selection:text-black transition-colors duration-300">
        <ThemeProvider>
          <AuthProvider>
            <FavoritesProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </FavoritesProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
