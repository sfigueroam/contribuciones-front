import {environment} from "../../environments/environment";

export function googleAnalyticsHeadScripts() {
  const head = document.getElementsByTagName('head')[0];

  const googleAnalyticsFirstScript = document.createElement('script');
  googleAnalyticsFirstScript.async = true;
  googleAnalyticsFirstScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + environment.googleAnalyticsCode;

  const googleAnalyticsSecondScript = document.createElement('script');
  googleAnalyticsSecondScript.innerHTML = '    window.dataLayer = window.dataLayer || [];\n' +
    '    function gtag(){dataLayer.push(arguments);}\n' +
    '    gtag(\'js\', new Date());\n' +
    '\n' +
    '    gtag(\'config\', \'' + environment.googleAnalyticsCode + '\');';

  head.insertBefore(googleAnalyticsSecondScript, head.firstChild);
  head.insertBefore(googleAnalyticsFirstScript, head.firstChild);
}

export function googleAnalytics(url) {
  gtag('config', environment.googleAnalyticsCode, {'page_path': url});
}
