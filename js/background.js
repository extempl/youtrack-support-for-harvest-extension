// Generated by CoffeeScript 1.6.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  (function() {
    var PlatformCookie, PlatformExtension, PlatformSubdomain, TimesheetVersion, config, lastVersion, splashUrl, thisVersion;
    config = this.config;
    PlatformSubdomain = this.PlatformSubdomain;
    TimesheetVersion = this.TimesheetVersion;
    PlatformCookie = this.PlatformCookie;
    PlatformExtension = (function() {
      function PlatformExtension() {
        this.getTimerStatus = __bind(this.getTimerStatus, this);
        var _this = this;
        this.subdomain = new PlatformSubdomain();
        this.timesheetVersion = new TimesheetVersion();
        $(document).on("login:change", this.subdomain.update);
        $(document).on("subdomain:change", this.timesheetVersion.togglePolling);
        $(document).on("subdomain:change", function(evt) {
          if (!evt.data) {
            return _this.setRunningTimerIcon(false);
          }
        });
        $(document).on("timesheetVersion:change", this.getTimerStatus);
        this.cookie = new PlatformCookie("platform_user_id");
        this.cookie.getCookie();
        chrome.runtime.onMessage.addListener(function(message) {
          return _this.timesheetVersion.update();
        });
      }

      PlatformExtension.prototype.getTimerStatus = function() {
        var _this = this;
        return $.ajax({
          url: "" + config.url + "/platform/last_running_timer.json",
          cache: false,
          success: function(data) {
            return _this.setRunningTimerIcon(data != null ? data.day_entry : void 0);
          }
        });
      };

      PlatformExtension.prototype.setRunningTimerIcon = function(running) {
        var state;
        state = running ? "on" : "off";
        chrome.browserAction.setIcon({
          path: {
            "19": "images/h-toolbar-" + state + "@19px.png",
            "38": "images/h-toolbar-" + state + "@38px.png"
          }
        });
        return chrome.browserAction.setTitle({
          title: running ? "View the running Harvest timer" : "Start a Harvest timer"
        });
      };

      return PlatformExtension;

    })();
    new PlatformExtension();
    lastVersion = localStorage.getItem("version");
    thisVersion = chrome.app.getDetails().version;
    localStorage.setItem("version", thisVersion);
    splashUrl = "http://www.getharvest.com/harvest-for-chrome-installed?version=" + thisVersion;
    if (!lastVersion && !localStorage.getItem("firstRunShown")) {
      return chrome.tabs.create({
        url: splashUrl
      });
    } else if (lastVersion !== thisVersion) {
      console.log("Upgrade notice: " + lastVersion + " upgraded to " + thisVersion);
      if (thisVersion === "1.2.0") {
        return chrome.tabs.create({
          url: "" + splashUrl + "&upgrade=true"
        });
      }
    }
  })();

}).call(this);
