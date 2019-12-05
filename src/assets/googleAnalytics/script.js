import {environment} from "../../environments/environment";

export function googleAnalyticsHeadScripts() {
  const head = document.getElementsByTagName('head')[0];
  const body = document.getElementsByTagName('body')[0];

  const googleAnalyticsFirstScript = document.createElement('script');
  googleAnalyticsFirstScript.async = true;
  googleAnalyticsFirstScript.src = 'https://www.googletagmanager.com/ns.html?id=' + environment.googleAnalyticsCode;

  const googleAnalyticsSecondScript = document.createElement('script');
  googleAnalyticsSecondScript.innerHTML = ' (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({\'gtm.start\':\n'+
  'new Date().getTime(),event:\'gtm.js\'});var f=d.getElementsByTagName(s)[0],\n'+
  'j=d.createElement(s),dl=l!=\'dataLayer\'?\'&l=\'+l:\'\';j.async=true;j.src=\n'+
  '\'https://www.googletagmanager.com/gtm.js?id=\'+i+dl;f.parentNode.insertBefore(j,f);\n'+
  '})(window,document,\'script\',\'dataLayer\',\'' + environment.googleAnalyticsCode + '\');';

  head.insertBefore(googleAnalyticsSecondScript, head.firstChild);
  body.insertBefore(googleAnalyticsFirstScript, body.firstChild);
}

export function googleAnalytics(url) {
  gtag('config', environment.googleAnalyticsCode, {'page_path': url});
}
