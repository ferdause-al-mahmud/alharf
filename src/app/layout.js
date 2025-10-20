import { Roboto, Assistant } from "next/font/google";
import "./globals.css";
import AuthProvider from "./services/AuthProvider";
import Footer from "./SharedComponents/Footer";
import Navbar from "./SharedComponents/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./CartProvider/CartProvider";
import Script from "next/script";

// Load Assistant font
const assistant = Assistant({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

// Load Roboto font if needed
const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Alharf - Women's Fashion, Footwear & Accessories",
    template: "%s | Alharf",
  },
  description:
    "Alharf offers premium women's fashion, including dresses, tops, shoes, handbags, accessories, and more. Elevate your look with our modern and elegant collections.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* ✅ Google Tag Manager: Data Layer */}
        <Script
          id="gtm-data-layer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];`,
          }}
        />

        {/* ✅ Google Tag Manager: Main Script (head equivalent) */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KJZHWX43');
            `,
          }}
        />

        {/* ✅ Meta Pixel (Facebook Pixel) */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s){
                if(f.fbq)return;
                n=f.fbq=function(){
                  n.callMethod ?
                  n.callMethod.apply(n,arguments) : n.queue.push(arguments)
                };
                if(!f._fbq)f._fbq=n;
                n.push=n;
                n.loaded=!0;
                n.version='2.0';
                n.queue=[];
                t=b.createElement(e);
                t.async=!0;
                t.src=v;
                s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)
              }(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1141675167899351');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>

      <body
        className={`${assistant.className} bg-[#f3f3f3]`}
        suppressHydrationWarning={true}
      >
        {/* ✅ Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KJZHWX43"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* ✅ Meta Pixel (noscript fallback) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1141675167899351&ev=PageView&noscript=1"
          />
        </noscript>

        {/* ✅ App Layout */}
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="pt-16">{children}</main>
            <Footer />
            <Toaster position="top-right" reverseOrder={false} />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
