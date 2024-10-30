import { USETIFUL_TOKEN } from 'config/environment';
import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <>
      <Html>
        <Head title="Wedding Day Timeline">
          <Script
            id="usetiful-script"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function (w, d, s) {
                var a = d.getElementsByTagName('head')[0];
                var r = d.createElement('script');
                r.async = 1;
                r.src = s;
                r.setAttribute('id', 'usetifulScript');
                r.dataset.token ="${USETIFUL_TOKEN}";
                a.appendChild(r);
              })(window, document, "https://www.usetiful.com/dist/usetiful.js");`,
            }}
          />
          <link rel="shortcut icon" href="/images/fav-icon.png" />
          <link rel="apple-touch-icon" href="/images/fav-icon.png" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          />
          {/* TODO:*/}
          {/* <Script
            defer
            src={`https://maps.googleapis.com/maps/api/js?key=${API_KEY_GOOGLE_MAPS}&libraries=places&callback=Function.prototype`}
          ></Script> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    </>
  );
}
