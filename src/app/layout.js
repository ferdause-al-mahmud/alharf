import { Roboto, Assistant } from "next/font/google";
import "./globals.css";
import AuthProvider from "./services/AuthProvider";
import Footer from "./SharedComponents/Footer";
import Navbar from "./SharedComponents/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./CartProvider/CartProvider";
import Script from "next/script";
import PopupWrapper from "./Components/PopupWrapper";

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

        {/* ✅ Updated GTM Script */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s);
                j.async=true;
                j.src="https://sst.alharfbd.com/8kw92iasihoct.js?"+i;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','dni0kuf=HQdSLz0%2BTCI%2BOSc%2FMUdSTwJeXUZYVQUHSQIDAAgBBwsQTQwHBA%3D%3D');
            `,
          }}
        />
      </head>

      <body
        className={`${assistant.className} bg-[#f3f3f3]`}
        suppressHydrationWarning={true}
      >
        {/* ✅ Updated GTM NoScript */}
        <noscript>
          <iframe
            src="https://sst.alharfbd.com/ns.html?id=GTM-KJZHWX43"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* ✅ App Layout */}
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <PopupWrapper /> {/* handles Sale + Free Delivery popups */}

            <main className="pt-16">{children}</main>
            <Footer />
            <Toaster position="top-right" reverseOrder={false} />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
