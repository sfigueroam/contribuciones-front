export class TgrReCaptcha{

  public siteKey = '';
  public badge: 'bottomright' | 'bottomleft' | 'inline' = 'inline';
  public type: 'image' | 'audio';
  public theme: 'light' | 'dark' = 'light';
  public action = '';
}
