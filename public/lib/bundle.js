(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c='function'==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error('Cannot find module \''+i+'\'');throw a.code='MODULE_NOT_FOUND',a;}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r);},p,p.exports,r,e,n,t);}return n[i].exports;}for(var u='function'==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o;}return r;})()({1:[function(require,module,exports){
/* eslint-disable no-undef */
    const MultiDimensional = window.require('multidimensional');
    const D  = 800;
    const Sections = 10;
    const sectionFactor = Array.from(Array(Sections).keys());
    // create a 3x3x4 array
    const ClusterArray = new MultiDimensional(sectionFactor);
    let sState = {
        cluster: ClusterArray,

    };

    // eslint-disable-next-line no-unused-vars
    function setup() {
        createCanvas(D,D);
        background(1);
        console.info('canvas setup', {canvas: {state}});
    }



    // eslint-disable-next-line no-unused-vars
    function draw() {
    // R, G & B integer values
        stroke(255, 204, 0);
        strokeWeight(4);
        circle(D/2, D/2, D/10);
    }

},{}]},{},[1]);
