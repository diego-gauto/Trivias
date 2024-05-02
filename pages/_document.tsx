import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { appConfig } from '../utils/appConfig';
import router from 'next/router';
/**
 * Document class
 * @class
 */
class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang={appConfig.locale}>
        <Head>
          <meta
            property='og:image'
            content={
              'https://firebasestorage.googleapis.com/v0/b/marketing-gonvar.appspot.com/o/200x200-px.png?alt=media&token=7e24eec7-1117-4ab2-ab0a-7a2acbaf0fa2'
            }
          />
          <link rel='icon' href='/images/32px.png' />
          <meta
            name='google-site-verification'
            content='ktKaEDz-5AbCakVSsWi0RPJmOVR7eKyxZOFVUirS3xw'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700;900&display=swap'
            rel='stylesheet'
          ></link>
          <link
            href='https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;700;900&display=swap'
            rel='stylesheet'
          ></link>
          <script src='https://cdn.jsdelivr.net/npm/hls.js@latest/dist/hls.min.js'></script>
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta name='csrf_token' content='' />
          <meta property='type' content='website' />
          <meta name='msapplication-TileColor' content='#ffffff' />
          <meta name='msapplication-TileImage' content='/ms-icon-144x144.png' />
          <meta property='fb:app_id' content='804211551373021' />
          <meta
            property='title'
            content={'Academia de Belleza Online | Gonvar'}
          />
          <meta
            property='og:title'
            content={'Academia de Belleza Online | Gonvar'}
          />
          <meta
            name='description'
            content={
              'Descubre la academia de belleza para convertirte en un experto. Aprende técnicas y tendencias con los profesionales del sector. ¡Inscríbete ya!'
            }
          />
          <meta
            property='og:description'
            content={
              'Descubre la academia de belleza para convertirte en un experto. Aprende técnicas y tendencias con los profesionales del sector. ¡Inscríbete ya!'
            }
          />
          <meta property='og:url' content={'https://gonvar.io'} />
          <meta name='theme-color' content='#ffffff' />
          <meta name='_token' content='' />
          <meta name='robots' content='noodp' />
          <meta property='og:locale' content='es_MX' />
          <meta property='og:type' content='website' />
          <noscript>
            <img
              height='1'
              width='1'
              style={{ display: 'none' }}
              src='https://www.facebook.com/tr?id=804211551373021&ev=PageView&noscript=1'
            />
          </noscript>
          <script
            async
            src='https://www.googletagmanager.com/gtag/js?id=G-8N2X594YBK'
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `  window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8N2X594YBK');`,
            }}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '804211551373021');
                fbq('track', 'PageView');
              `,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              ! function(w, d, t) {
                w.TiktokAnalyticsObject = t;
                var ttq = w[t] = w[t] || [];
                ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"], ttq.setAndDefer = function(t, e) {
                    t[e] = function() {
                        t.push([e].concat(Array.prototype.slice.call(arguments, 0)))
                    }
                };
                for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
                ttq.instance = function(t) {
                    for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]);
                    return e
                }, ttq.load = function(e, n) {
                    var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
                    ttq._i = ttq._i || {}, ttq._i[e] = [], ttq._i[e]._u = i, ttq._t = ttq._t || {}, ttq._t[e] = +new Date, ttq._o = ttq._o || {}, ttq._o[e] = n || {};
                    var o = document.createElement("script");
                    o.type = "text/javascript", o.async = !0, o.src = i + "?sdkid=" + e + "&lib=" + t;
                    var a = document.getElementsByTagName("script")[0];
                    a.parentNode.insertBefore(o, a)
                };
                ttq.load('CNOUJ1BC77UA3TGJ9G4G');
                ttq.page();
            }(window, document, 'ttq');
              `,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-M4DJNFW');`,
            }}
          ></script>
          <noscript>
            <iframe
              src='https://www.googletagmanager.com/ns.html?id=GTM-M4DJNFW'
              height='0'
              width='0'
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
          <script
            type='text/javascript'
            src='https://cdn.conekta.io/js/latest/conekta.js'
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
