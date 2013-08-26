// @read: http://appcachefacts.info/
// when the page loads, set the status to online or offline
function loadDemo() {
    // Log timing 
    if (navigator.onLine) {
        appCacheLog("Initial online status: online");
        return;
    } else {
        appCacheLog("Initial online status: offline");
        return;
    }
}

// add listeners on page load and unload
window.addEventListener("load", loadDemo, true);

var counter = 1;

appCacheLog = function() {
    var p = document.createElement("p");
    var message = Array.prototype.join.call(arguments, " ");
    p.innerHTML = message;
    document.getElementById("info").appendChild(p);
}

// log each of the events fired by window.applicationCache
window.applicationCache.onchecking = function(e) {
    appCacheLog("Checking for updates");
}

window.applicationCache.onnoupdate = function(e) {
    appCacheLog("No updates found");
}

window.applicationCache.onupdateready = function(e) {
    appCacheLog("Update complete");
}

window.applicationCache.onobsolete = function(e) {
    appCacheLog("Cache obsolete");
}

window.applicationCache.ondownloading = function(e) {
    appCacheLog("Downloading updates");
}

window.applicationCache.oncached = function(e) {
    appCacheLog("Cached");
}

window.applicationCache.onerror = function(e) {
    appCacheLog("ApplicationCache error");
}

window.applicationCache.onprogress = function(e) {
    appCacheLog("Progress: downloaded file " + counter);
    counter++;
}

window.addEventListener("online", function(e) {
    appCacheLog("You are online");
}, true);

window.addEventListener("offline", function(e) {
    appCacheLog("You are offline");
}, true);

// Convert applicationCache status codes into messages
showCacheStatus = function(n) {
    statusMessages = ["Uncached","Idle","Checking","Downloading","Update Ready","Obsolete"];
    return statusMessages[n];
}

onload = function(e) {
    // Check for required browser features
    if (!window.applicationCache) {
        appCacheLog("HTML5 offline web applications (ApplicationCache) are not supported in your browser.");
        return;
    }

    appCacheLog("Initial AppCache status: " + showCacheStatus(window.applicationCache.status));

}