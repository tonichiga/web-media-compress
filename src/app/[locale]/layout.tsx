import { modalList } from "@/05.features/modal-manager";
import { locales, routing } from "@/i18n";
import { ModalProvider } from "@4i/modal-manager";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import { AppLayout } from "../layouts";
import { ReduxProvider, ThemeProvider } from "../providers";
import "../styles/globals.css";

const INTER = Inter({
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-inter",
  subsets: ["cyrillic-ext", "latin-ext"],
});

//fake

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// fake

const RootLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${INTER.variable} min-h-screen flex flex-col`}>
        <NextIntlClientProvider>
          <ReduxProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <AppLayout>{children}</AppLayout>
            </ThemeProvider>
            {/* dont set z-index 10000000000000! */}
            <ModalProvider className="z-100" modalList={modalList} />
            <Toaster />
          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
