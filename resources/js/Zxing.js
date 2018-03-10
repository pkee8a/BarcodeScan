function zxinglistener(e){
    localStorage["zxingbarcode"] = "";
    if(e.url.split("\#")[0] == window.location.href){
        window.focus();
        processBarcode(decodeURIComponent(e.newValue));
    }
    window.removeEventListener("storage", zxinglistener, false);
}
if(window.location.hash != ""){
    localStorage["zxingbarcode"] = window.location.hash.substr(1);
    self.close();
    window.location.href="about:blank";//In case self.close is disabled
}else{
    window.addEventListener("hashchange", function(e){
        window.removeEventListener("storage", zxinglistener, false);
        var hash = window.location.hash.substr(1);
        if (hash != "") {
            window.location.hash = "";
            processBarcode(decodeURIComponent(hash));
        }
    }, false);
}
function getScan(){
    var href = window.location.href.split("\#")[0];
    window.addEventListener("storage", zxinglistener, false);
    zxingWindow = window.open("zxing://scan/?ret=" + encodeURIComponent(href + "#{CODE}"),'_self');
}
