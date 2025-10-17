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

        {/* Data Layer Initialization */}
        <Script
          id="gtm-data-layer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];`,
          }}
        />

        {/* Google Tag Manager */}
        {/* <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-T7N6H46R');
            `,
          }}
        /> */}

        {/* new server side tracking script */}

        <Script
          id="google-tag-manager-custom"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
      (function(w,d,s,l,i){
        w[l] = w[l] || [];
        w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
        var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s);
        j.async = true;
        j.src = "https://load.sst.alharfbd.com/9lbcdttzm.js?" + i;
        f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', '7=aWQ9R1RNLVQ3TjZINDZS&page=2');
    `,
          }}
        />


      </head>

      <body
        className={`${assistant.className} bg-[#f3f3f3]`}
        suppressHydrationWarning={true}
      >
        {/* Google Tag Manager (noscript) - Placed at the very top */}
        {/*  <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T7N6H46R"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}  // ✅ Correct
          ></iframe>
        </noscript> */}

        {/* SST Server Side Tracking (noscript) */}
        <noscript>
          <iframe
            src="https://load.sst.alharfbd.com/ns.html?id=GTM-T7N6H46R"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

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
