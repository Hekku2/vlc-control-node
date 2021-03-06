/**
 * @author Fernando
 */

var http = require("http");

var ipServer = '';
var portServer = 8080;
var user = '';
var password = '';

var vlcControl = module.exports = function(config) {};

function getOptions(path) {
    var p = '/requests/status.json';

    if ( path ) {
        p += '?command=' + path;
    }

    return {
        host : ipServer,
        port : portServer,
        path : p,
        method : 'GET',
        auth : user + ':' + password,
        headers : {
            'Content-Type' : 'application/json'
        }
    };
}

function request(options) {
    var prot = http;
    var req = prot.request(options, function(res) {
        var output = '';
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            output += chunk;
        });
    });

    req.on('error', function(err) {
        console.error(err.stack);
        console.error(options);
    });

    req.end();
}

(function() {
    this.init = function(options) {
        ipServer = options.ip;
        portServer = options.port;
        user = options.user;
        password = options.password;
        setInterval(function() {
            var options = getOptions();
            request(options);
        }, 500);
    };
    this.addAndStart = function(uri, noaudio, novideo) {
        var options;
        if (noaudio)
            options = getOptions('in_play&input=' + uri + '&option=noaudio');
        else if (novideo)
            options = getOptions('in_play&input=' + uri + '&option=novideo');
        else
            options = getOptions('in_play&input=' + uri);
        request(options);
    };

    this.addToPlaylist = function(uri) {
        var options = getOptions("in_enqueue&input=" + uri);
        request(options);
    };

    this.play = function(id) {
        var options;
        if (id)
            options = getOptions('pl_play&id=' + id);
        else
            options = getOptions('pl_play');
        request(options);
    };

    this.pause = function(id) {
        var options;
        if (id)
            options = getOptions('pl_pause&id=' + id);
        else
            options = getOptions('pl_pause');
        request(options);
    };

    this.forceResume = function() {
        var options = getOptions('pl_forceresume');
        request(options);
    };

    this.forcePause = function() {
        var options = getOptions('pl_forcepause');
        request(options);
    };

    this.stop = function() {
        var options = getOptions('pl_stop');
        request(options);
    };

    this.next = function() {
        var options = getOptions('pl_next');
        request(options);
    };

    this.previous = function() {
        var options = getOptions('pl_previous');
        request(options);
    };

    this.delete = function(id) {
        var options = getOptions('pl_delete&id=' + id);
        request(options);
    };

    this.empty = function() {
        var options = getOptions('pl_empty');
        request(options);
    };

    this.rate = function(rate) {
        var options = getOptions('rate&val=' + rate);
        request(options);
    };

    this.aspectRatio = function(ar) {
        var options = getOptions('aspectratio&val=' + ar);
        request(options);
    };

    this.sort = function(id, val) {
        var options = getOptions('pl_sort&id=' + id + '&val=' + val);
        request(options);
    };

    this.random = function() {
        var options = getOptions('pl_random');
        request(options);
    };

    this.loop = function() {
        var options = getOptions('pl_loop');
        request(options);
    };

    this.repeat = function() {
        var options = getOptions('pl_repeat');
        request(options);
    };

    this.fullscreen = function() {
        var options = getOptions('fullscreen');
        request(options);
    };

    this.setVolume = function(val) {
        var options = getOptions('volume&val=' + val);
        request(options);
    };

}).call(vlcControl);
