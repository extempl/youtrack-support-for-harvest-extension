// Generated by CoffeeScript 1.6.3
(function() {
  (function() {
    var _base;
    (_base = $.ajaxSettings).headers || (_base.headers = {});
    return $.ajaxSettings.headers["X-HarvestChromeExt"] = chrome.app.getDetails().version;
  })();

}).call(this);
