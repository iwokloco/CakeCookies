export var cake = {
  enabled: navigator.cookieEnabled,
  removeCookie: (cname) => document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`,
  addCookie: (cname, value) => document.cookie = `${cname}=${value}`,
  addJSONCookie: (cname, json) => document.cookie = `${cname}=${JSON.stringify(json)}`,
  addJSONCookieWithExpiration: (cname, json, minutes, onExpired) => {
    const exp = new Date(new Date().getTime() + minutes * 60 * 1000).toUTCString();
    document.cookie = cname + "=" + JSON.stringify(json) + ";path=/;expires=" + exp + ";";
    document.cookie = cname + "_exp=" + exp + ";path=/;expires=" + exp + ";";
    window.setTimeout(function () {
      if (!(document.cookie && document.cookie.indexOf(cname + '=') != -1))
        onExpired();
    }, minutes * 60 * 1000 + 3);
  },
  onCookieExpired: (cname, onExpired) => {
    var cookie_exp = cake.getCookie(cname + "_exp");
    if (cookie_exp) {
      var now = new Date();
      var expire_in_milliseconds = (new Date(Date.parse(cookie_exp))) - now.getTime();
      window.setTimeout(() => {
        if (!(document.cookie && document.cookie.indexOf(cname + '=') != -1))
          onExpired();
      }, expire_in_milliseconds + 3);
    } else {
      onExpired();
    }
  },
  getCookie: (cname) => {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  },
  getJSONCookie: (cname) => {
    const json = cake.getCookie(cname);
    return (json && json.length > 1) ? JSON.parse(json) : null;
  }
};