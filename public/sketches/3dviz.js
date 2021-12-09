/* eslint-disable no-undef */
const D = 500;
const HD = D / 2;
const l = console.log;
const SIZE = 10;

let d;
let dn;
let step;
let dim;

// eslint-disable-next-line no-unused-vars
function setup() {
    createCanvas(D + 150, D + 150, WEBGL);
    setAttributes('antialias', true);
    d = range(SIZE);
    dn = range(SIZE, true);
    step = HD / SIZE;
    background(125);
    dim = dn.concat(0).concat(d);

    // define initial state
    var state = {
        distance: D*10
    // rotation : Dw.Rotation.create({angles_xyz:[0, 0, 0]}),
    };

    console.log(Dw.EasyCam.INFO);

    easycam = new Dw.EasyCam(this._renderer, state);

    // slower transitions look nicer in the ortho mode
    easycam.setDefaultInterpolationTime(2000); //slower transition
    // start with an animated rotation with 2.5 second transition time
    easycam.setRotation(
        Dw.Rotation.create({ angles_xyz: [PI / 2, PI / 2, PI / 2] }),
        2500
    );
    easycam.setDistance(D*2, 2500);
}

function range(size = 1, negative = false) {
    let baseRange = Array.from(Array(size).keys()).map((v) => v + 1);
    if (negative) {
        baseRange = baseRange.map((v) => (v *= -1)).reverse();
    }
    return baseRange;
}

function drawPoint(x = 0, y = 0, z = 0) {
    stroke('purple'); // Change the color
    strokeWeight(10); // Make the points 10 pixels
    point(x, y, z);
}
function drawDX(dimen, step) {
    const Y = 0,
        Z = 0;
    for (let index = 0; index < dim.length; index++) {
        const degree = dim[index];
        drawPoint(degree * step, Y, Z);
    }
}
function drawDY(dimen, step) {
    const X = 0,
        Z = 0;
    for (let index = 0; index < dim.length; index++) {
        const degree = dim[index];
        drawPoint(X, degree * step, Z);
    }
}
function drawDZ(dimen, step) {
    const X = 0, Y = 0;
    for (let index = 0; index < dim.length; index++) {
        const degree = dim[index];
        drawPoint(X, Y, degree * step);
    }
}

// eslint-disable-next-line no-unused-vars
function draw() {
    // projection
    var cam_dist = easycam.getDistance();
    var oscale = cam_dist * 0.001;
    var ox = width  / 2 * oscale;
    var oy = height / 2 * oscale;
    ortho(-ox, +ox, -oy, +oy, -10000, 10000);
    easycam.setPanScale(0.004 / sqrt(cam_dist));
  
    background(125);
    drawDX(dim, step);
    drawDY(dim, step);
    drawDZ(dim, step);
}





























































// p5.EasyCamera

'use strict';var Dw=function(a){const b={LIBRARY:'p5.EasyCam',VERSION:'1.2.0',AUTHOR:'p5.EasyCam authors',SOURCE:'https://github.com/freshfork/p5.EasyCam',toString:function(){return `${this.LIBRARY} v${this.VERSION} by ${this.AUTHOR} (${this.SOURCE})`;}};class c{constructor(a,c){if(!(a instanceof p5.RendererGL))return void console.log('renderer needs to be an instance of p5.RendererGL');var g=a.elt.getBoundingClientRect();c=c||{},void 0===c.distance&&(c.distance=500),void 0===c.center&&(c.center=[0,0,0]),void 0===c.rotation&&(c.rotation=f.identity()),void 0===c.viewport&&(c.viewport=[0,0,a.width,a.height]),void 0===c.offset&&(c.offset=[g.x+window.scrollX,g.y+window.scrollY]),this.INFO=b,this.setCanvas(a);var h=this;this.cam=h,this.LOOK=[0,0,1],this.UP=[0,1,0],this.AXIS=new function(){this.YAW=1,this.PITCH=2,this.ROLL=4,this.ALL=this.YAW|this.PITCH|this.ROLL;},this.SHIFT_CONSTRAINT=0,this.FIXED_CONSTRAINT=0,this.DRAG_CONSTRAINT=0,this.scale_rotation=.001,this.scale_pan=2e-4,this.scale_zoom=.001,this.scale_zoomwheel=20,this.distance_min_limit=.01,this.distance_min=1,this.distance_max=Number.MAX_VALUE,this.state={distance:c.distance,center:c.center.slice(),rotation:c.rotation.slice(),copy:function(a){return a=a||{},a.distance=this.distance,a.center=this.center.slice(),a.rotation=this.rotation.slice(),a;}},this.state_reset=this.state.copy(),this.state_pushed=this.state.copy(),this.viewport=c.viewport.slice(),this.offset=c.offset.slice(),window.addEventListener('resize',function(){let b=a.elt.getBoundingClientRect();h.offset=[b.x+window.scrollX,b.y+window.scrollY];}),this.mouse={cam:h,curr:[0,0,0],prev:[0,0,0],dist:[0,0,0],mwheel:0,isPressed:!1,istouchdown:!1,ismousedown:!1,BUTTON:{LMB:1,MMB:2,RMB:4},button:0,mouseDragLeft:h.mouseDragRotate.bind(h),mouseDragCenter:h.mouseDragPan.bind(h),mouseDragRight:h.mouseDragZoom.bind(h),mouseWheelAction:h.mouseWheelZoom.bind(h),touchmoveSingle:h.mouseDragRotate.bind(h),touchmoveMulti:function(){h.mouseDragPan(),h.mouseDragZoom();},insideViewport:function(a,b){var c=h.viewport[0],d=c+h.viewport[2],e=h.viewport[1],f=e+h.viewport[3];return a>c&&a<d&&b>e&&b<f;},solveConstraint:function(){var a=this.dist[0],b=this.dist[1];this.shiftKey&&!h.SHIFT_CONSTRAINT&&1<Math.abs(a-b)&&(h.SHIFT_CONSTRAINT=Math.abs(a)>Math.abs(b)?h.AXIS.YAW:h.AXIS.PITCH),h.DRAG_CONSTRAINT=h.AXIS.ALL,h.FIXED_CONSTRAINT&&(h.DRAG_CONSTRAINT=h.FIXED_CONSTRAINT),h.SHIFT_CONSTRAINT&&(h.DRAG_CONSTRAINT=h.SHIFT_CONSTRAINT);},updateInput:function(a,b,c){var d=h.mouse,e=h.P5.pixelDensity();d.prev[0]=d.curr[0],d.prev[1]=d.curr[1],d.prev[2]=d.curr[2],d.curr[0]=a,d.curr[1]=b,d.curr[2]=c,d.dist[0]=-(d.curr[0]-d.prev[0])/e,d.dist[1]=-(d.curr[1]-d.prev[1])/e,d.dist[2]=-(d.curr[2]-d.prev[2])/e;},mousedown:function(a){var b=h.mouse,c=h.offset[0]-window.scrollX,d=h.offset[1]-window.scrollY;0===a.button&&(b.button|=b.BUTTON.LMB),1===a.button&&(b.button|=b.BUTTON.MMB),2===a.button&&(b.button|=b.BUTTON.RMB),b.insideViewport(a.x-c,a.y-d)&&(b.updateInput(a.x-c,a.y-d,a.y-d),b.ismousedown=0<b.button,b.isPressed=b.ismousedown,h.SHIFT_CONSTRAINT=0);},mousedrag:function(){var a=h.P5.pixelDensity(),b=h.mouse;if(b.ismousedown){var c=h.P5.mouseX,d=h.P5.mouseY;b.updateInput(c,d,d),b.solveConstraint();var e=b.button&b.BUTTON.LMB,f=b.button&b.BUTTON.MMB,g=b.button&b.BUTTON.RMB;e&&b.mouseDragLeft&&b.mouseDragLeft(),f&&b.mouseDragCenter&&b.mouseDragCenter(),g&&b.mouseDragRight&&b.mouseDragRight();}},mouseup:function(a){var b=h.mouse;0===a.button&&(b.button&=~b.BUTTON.LMB),1===a.button&&(b.button&=~b.BUTTON.MMB),2===a.button&&(b.button&=~b.BUTTON.RMB),b.ismousedown=0<b.button,b.isPressed=b.istouchdown||b.ismousedown,h.SHIFT_CONSTRAINT=0;},dblclick:function(a){var b=h.offset[0]-window.scrollX,c=h.offset[1]-window.scrollY;h.mouse.insideViewport(a.x-b,a.y-c)&&h.reset();},wheel:function(a){var b=a.x,c=a.y,d=h.mouse;d.insideViewport(b,c)&&(d.mwheel=.01*a.deltaY,d.mouseWheelAction&&d.mouseWheelAction());},evaluateTouches:function(a){var b,c,d,e=a.touches,f=0,g=0,j=0,k=e.length,l=h.offset[0]-window.scrollX,m=h.offset[1]-window.scrollY;for(b=0;b<k;b++)f+=e[b].clientX-l,g+=e[b].clientY-m;for(f/=k,g/=k,b=0;b<k;b++)c=f-(e[b].clientX-l),d=g-(e[b].clientY-m),j+=Math.sqrt(c*c+d*d);j/=k,h.mouse.updateInput(f,g,-j);},touchstart:function(a){a.preventDefault(),a.stopPropagation();var b=h.mouse;b.evaluateTouches(a),b.istouchdown=b.insideViewport(b.curr[0],b.curr[1]),b.isPressed=h.mouse.istouchdown||h.mouse.ismousedown,b.dbltap(a);},touchmove:function(a){a.preventDefault(),a.stopPropagation();var b=h.mouse;b.istouchdown&&(b.evaluateTouches(a),b.solveConstraint(),1===a.touches.length?b.touchmoveSingle():(b.touchmoveMulti(),b.tapcount=0));},touchend:function(a){a.preventDefault(),a.stopPropagation();var b=h.mouse;b.istouchdown=!1,b.isPressed=b.istouchdown||b.ismousedown,h.SHIFT_CONSTRAINT=0,2<=b.tapcount&&(b.insideViewport(b.curr[0],b.curr[1])&&h.reset(),b.tapcount=0);},tapcount:0,dbltap:function(){0==h.mouse.tapcount++&&setTimeout(function(){h.mouse.tapcount=0;},350);},shiftKey:!1,keydown:function(a){var b=h.mouse;b.shiftKey||(b.shiftKey=16===a.keyCode);},keyup:function(a){var b=h.mouse;b.shiftKey&&(b.shiftKey=16!==a.keyCode,!b.shiftKey&&(h.SHIFT_CONSTRAINT=0));}},this.attachMouseListeners(),this.auto_update=!0,this.P5.registerMethod('pre',function(){h.auto_update&&h.update();}),this.dampedZoom=new d(function(a){h.zoom(a*h.getZoomMult());}),this.dampedPanX=new d(function(a){h.panX(a*h.getPanMult());}),this.dampedPanY=new d(function(a){h.panY(a*h.getPanMult());}),this.dampedRotX=new d(function(a){h.rotateX(a*h.getRotationMult());}),this.dampedRotY=new d(function(a){h.rotateY(a*h.getRotationMult());}),this.dampedRotZ=new d(function(a){h.rotateZ(a*h.getRotationMult());}),this.timedRot=new e(h.setInterpolatedRotation.bind(h)),this.timedPan=new e(h.setInterpolatedCenter.bind(h)),this.timedzoom=new e(h.setInterpolatedDistance.bind(h));}setCanvas(a){a instanceof p5.RendererGL?(this.renderer=a,this.graphics=a._pInst instanceof p5?a:a._pInst,this.P5=this.graphics._pInst):(this.graphics=void 0,this.renderer=void 0);}getCanvas(){return this.renderer;}attachListener(a,b,c,d){a&&a!==c.el&&(this.detachListener(c),c.el=a,c.ev=b,c.op=d,c.el.addEventListener(c.ev,c,c.op));}detachListener(a){a.el&&(a.el.removeEventListener(a.ev,a,a.op),a.el=void 0);}attachMouseListeners(a){var b=this.cam,c=b.mouse;if(a=a||b.renderer,a){var d={passive:!1},e=a.elt;b.attachListener(e,'mousedown',c.mousedown,d),b.attachListener(e,'mouseup',c.mouseup,d),b.attachListener(e,'dblclick',c.dblclick,d),b.attachListener(e,'wheel',c.wheel,d),b.attachListener(e,'touchstart',c.touchstart,d),b.attachListener(e,'touchend',c.touchend,d),b.attachListener(e,'touchmove',c.touchmove,d),b.attachListener(window,'keydown',c.keydown,d),b.attachListener(window,'keyup',c.keyup,d);}}removeMouseListeners(){var a=this.cam,b=a.mouse;a.detachListener(b.mousedown),a.detachListener(b.mouseup),a.detachListener(b.dblclick),a.detachListener(b.wheel),a.detachListener(b.keydown),a.detachListener(b.keyup),a.detachListener(b.touchstart),a.detachListener(b.touchend),a.detachListener(b.touchmove);}dispose(){removeMouseListeners();}getAutoUpdate(){return this.auto_update;}setAutoUpdate(a){this.auto_update=a;}update(){var a=this.cam,b=a.mouse;b.mousedrag();var c=!1;c|=a.dampedZoom.update(),c|=a.dampedPanX.update(),c|=a.dampedPanY.update(),c|=a.dampedRotX.update(),c|=a.dampedRotY.update(),c|=a.dampedRotZ.update(),c?(a.timedRot.stop(),a.timedPan.stop(),a.timedzoom.stop()):(a.timedRot.update(),a.timedPan.update(),a.timedzoom.update()),a.apply();}apply(a){var b=this.cam;a=a||b.renderer,a&&(this.camEYE=this.getPosition(this.camEYE),this.camLAT=this.getCenter(this.camLAT),this.camRUP=this.getUpVector(this.camRUP),void 0===a._curCamera?a.camera(this.camEYE[0],this.camEYE[1],this.camEYE[2],this.camLAT[0],this.camLAT[1],this.camLAT[2],this.camRUP[0],this.camRUP[1],this.camRUP[2]):a._curCamera.camera(this.camEYE[0],this.camEYE[1],this.camEYE[2],this.camLAT[0],this.camLAT[1],this.camLAT[2],this.camRUP[0],this.camRUP[1],this.camRUP[2]));}setViewport(a){this.viewport=a.slice();}getViewport(){return this.viewport;}mouseWheelZoom(){var a=this,b=a.mouse;a.dampedZoom.addForce(b.mwheel*a.scale_zoomwheel);}mouseDragZoom(){var a=this,b=a.mouse;a.dampedZoom.addForce(-b.dist[2]);}mouseDragPan(){var a=this,b=a.mouse;a.dampedPanX.addForce(a.DRAG_CONSTRAINT&a.AXIS.YAW?b.dist[0]:0),a.dampedPanY.addForce(a.DRAG_CONSTRAINT&a.AXIS.PITCH?b.dist[1]:0);}mouseDragRotate(){var a=this,b=a.mouse,c=b.curr[0],d=b.curr[1],e=b.dist[0],f=b.dist[1],g=2*Math.min(Math.max((c-a.viewport[0])/a.viewport[2],0),1)-1,h=2*Math.min(Math.max((d-a.viewport[1])/a.viewport[3],0),1)-1;a.DRAG_CONSTRAINT&a.AXIS.YAW&&a.dampedRotY.addForce(+e*(1-h*h)),a.DRAG_CONSTRAINT&a.AXIS.PITCH&&a.dampedRotX.addForce(-f*(1-g*g)),a.DRAG_CONSTRAINT&a.AXIS.ROLL&&(a.dampedRotZ.addForce(-e*h),a.dampedRotZ.addForce(+f*g));}getZoomMult(){return this.state.distance*this.scale_zoom;}getPanMult(){return this.state.distance*this.scale_pan;}getRotationMult(){return Math.pow(Math.log10(1+this.state.distance),.5)*this.scale_rotation;}zoom(a){var b=this.cam,c=b.state.distance+a;c<b.distance_min&&(c=b.distance_min,b.dampedZoom.stop()),c>b.distance_max&&(c=b.distance_max,b.dampedZoom.stop()),b.state.distance=c;}panX(a){var b=this.cam.state;if(a){var c=f.applyToVec3(b.rotation,[a,0,0]);h.add(b.center,c,b.center);}}panY(a){var b=this.cam.state;if(a){var c=f.applyToVec3(b.rotation,[0,a,0]);h.add(b.center,c,b.center);}}pan(a){this.cam.panX(a),this.cam.panY(a);}rotateX(a){this.cam.rotate([1,0,0],a);}rotateY(a){this.cam.rotate([0,1,0],a);}rotateZ(a){this.cam.rotate([0,0,1],a);}rotate(a,b){var c=this.cam.state;if(b){var d=f.create({axis:a,angle:b});f.applyToRotation(c.rotation,d,c.rotation);}}setInterpolatedDistance(a,b,c){this.cam.state.distance=g.mix(a,b,g.smoothstep(c));}setInterpolatedCenter(a,b,c){this.cam.state.center=h.mix(a,b,g.smoothstep(c));}setInterpolatedRotation(a,b,c){this.cam.state.rotation=f.slerp(a,b,c);}setDistanceMin(a){this.distance_min=Math.max(a,this.distance_min_limit),this.zoom(0);}setDistanceMax(a){this.distance_max=a,this.zoom(0);}setDistance(a,b){this.timedzoom.start(this.state.distance,a,b,[this.dampedZoom]);}getDistance(){return this.state.distance;}setCenter(a,b){this.timedPan.start(this.state.center,a,b,[this.dampedPanX,this.dampedPanY]);}getCenter(){return this.state.center;}setRotation(a,b){this.timedRot.start(this.state.rotation,a,b,[this.dampedRotX,this.dampedRotY,this.dampedRotZ]);}getRotation(){return this.state.rotation;}getPosition(a){var b=this.cam,c=b.state;return a=h.assert(a),f.applyToVec3(c.rotation,b.LOOK,a),h.mult(a,c.distance,a),h.add(a,c.center,a),a;}getUpVector(a){var b=this.cam,c=b.state;return a=h.assert(a),f.applyToVec3(c.rotation,b.UP,a),a;}getState(){return this.state.copy();}setState(a,b){a&&(this.setDistance(a.distance,b),this.setCenter(a.center,b),this.setRotation(a.rotation,b));}pushState(){return this.state_pushed=this.getState();}popState(a){this.setState(this.state_pushed,a);}pushResetState(){return this.state_reset=this.getState();}reset(a){this.setState(this.state_reset,a);}setRotationScale(a){this.scale_rotation=a;}setPanScale(a){this.scale_pan=a;}setZoomScale(a){this.scale_zoom=a;}setWheelScale(a){this.scale_zoomwheel=a;}getRotationScale(){return this.scale_rotation;}getPanScale(){return this.scale_pan;}getZoomScale(){return this.scale_zoom;}getWheelScale(){return this.scale_zoomwheel;}setDamping(a){this.dampedZoom.damping=a,this.dampedPanX.damping=a,this.dampedPanY.damping=a,this.dampedRotX.damping=a,this.dampedRotY.damping=a,this.dampedRotZ.damping=a;}setDefaultInterpolationTime(a){this.timedRot.default_duration=a,this.timedPan.default_duration=a,this.timedzoom.default_duration=a;}setRotationConstraint(a,b,c){var d=this.cam;d.FIXED_CONSTRAINT=0,d.FIXED_CONSTRAINT|=a?d.AXIS.YAW:0,d.FIXED_CONSTRAINT|=b?d.AXIS.PITCH:0,d.FIXED_CONSTRAINT|=c?d.AXIS.ROLL:0;}beginHUD(a,b,c){var e=this.cam;if(a=a||e.renderer,!!a){this.pushed_rendererState=a.push();var f=a.drawingContext,b=void 0===b?a.width:b,c=void 0===c?a.height:c,g=Number.MAX_VALUE;f.flush(),f.disable(f.DEPTH_TEST),this.pushed_uMVMatrix=a.uMVMatrix.copy(),this.pushed_uPMatrix=a.uPMatrix.copy(),a.resetMatrix(),a._curCamera.ortho(0,b,-c,0,-g,+g);}}endHUD(a){var b=this.cam;if(a=a||b.renderer,!!a){var c=a.drawingContext;c.flush(),a.uMVMatrix.set(this.pushed_uMVMatrix),a.uPMatrix.set(this.pushed_uPMatrix),c.enable(c.DEPTH_TEST),a.pop(this.pushed_rendererState);}}}class d{constructor(a){this.value=0,this.damping=.85,this.action=a;}addForce(a){this.value+=a;}update(){var a=1e-6<this.value*this.value;return a?(this.action(this.value),this.value*=this.damping):this.stop(),a;}stop(){this.value=0;}}class e{constructor(a){this.default_duration=300,this.action=a;}start(a,b,c,d){for(var e in d)d[e].stop();this.valA=a,this.valB=b,this.duration=void 0===c?this.default_duration:c,this.timer=new Date().getTime(),this.active=0<this.duration,this.active||this.interpolate(1);}update(){if(this.active){var a=(new Date().getTime()-this.timer)/this.duration;.995<a?(this.interpolate(1),this.stop()):this.interpolate(a);}}interpolate(a){this.action(this.valA,this.valB,a);}stop(){this.active=!1;}}var f={assert:function(a){return void 0===a||a.constructor!==Array?[1,0,0,0]:a;},identity:function(){return[1,0,0,0];},applyToVec3:function(a,b,c){var[d,e,f]=b,[g,i,j,k]=a,l=i*d+j*e+k*f;return c=h.assert(c),c[0]=2*(g*(d*g-(j*f-k*e))+l*i)-d,c[1]=2*(g*(e*g-(k*d-i*f))+l*j)-e,c[2]=2*(g*(f*g-(i*e-j*d))+l*k)-f,c;},applyToRotation(a,b,c){var[d,e,g,h]=a,[i,j,k,l]=b;return c=f.assert(c),c[0]=i*d-(j*e+k*g+l*h),c[1]=j*d+i*e+(k*h-l*g),c[2]=k*d+i*g+(l*e-j*h),c[3]=l*d+i*h+(j*g-k*e),c;},slerp:function(a,b,c,d){var[e,g,h,i]=a,[j,k,l,m]=b,n=e*j+g*k+h*l+i*m;0>n&&(j=-j,k=-k,l=-l,m=-m,n=-n);var o,p,q=Math.acos(n),r=Math.sqrt(1-n*n);return .001<r?(o=Math.sin((1-c)*q)/r,p=Math.sin(c*q)/r):(o=1-c,p=c),d=f.assert(d),d[0]=o*e+p*j,d[1]=o*g+p*k,d[2]=o*h+p*l,d[3]=o*i+p*m,f.create({rotation:d,normalize:!0},d);},create:function(a,b){if(b=f.assert(b),a.axis){var c=a.axis,d=a.angle,e=h.mag(c);if(0==e)return;var g=-.5*d,i=Math.sin(g)/e;return b[0]=Math.cos(g),b[1]=i*c[0],b[2]=i*c[1],b[3]=i*c[2],b;}if(a.rotation){if(b[0]=a.rotation[0],b[1]=a.rotation[1],b[2]=a.rotation[2],b[3]=a.rotation[3],a.normalize){var j=1/Math.sqrt(b[0]*b[0]+b[1]*b[1]+b[2]*b[2]+b[3]*b[3]);b[0]*=j,b[1]*=j,b[2]*=j,b[3]*=j;}return b;}if(a.angles_xyz){var k=-.5*a.angles_xyz[0],l=-.5*a.angles_xyz[1],m=-.5*a.angles_xyz[2],n=[Math.cos(k),Math.sin(k),0,0],o=[Math.cos(l),0,Math.sin(l),0],p=[Math.cos(m),0,0,Math.sin(m)];return f.applyToRotation(o,p,b),f.applyToRotation(n,b,b),b;}}},g={mix:function(c,a,b){return c*(1-b)+a*b;},smoothstep:function(a){return a*a*(3-2*a);},smootherstep:function(){return x*x*x*(x*(6*x-15)+10);}},h={assert:function(a){return void 0===a||a.constructor!==Array?[0,0,0]:a;},isScalar:function(a){return void 0!==a&&a.constructor!==Array;},add:function(c,a,b){return b=this.assert(b),this.isScalar(a)?(b[0]=c[0]+a,b[1]=c[1]+a,b[2]=c[2]+a):(b[0]=c[0]+a[0],b[1]=c[1]+a[1],b[2]=c[2]+a[2]),b;},mult:function(c,a,b){return b=this.assert(b),this.isScalar(a)?(b[0]=c[0]*a,b[1]=c[1]*a,b[2]=c[2]*a):(b[0]=c[0]*a[0],b[1]=c[1]*a[1],b[2]=c[2]*a[2]),b;},magSq:function(b){return b[0]*b[0]+b[1]*b[1]+b[2]*b[2];},mag:function(b){return Math.sqrt(b[0]*b[0]+b[1]*b[1]+b[2]*b[2]);},dot:function(c,a){return c[0]*a[0]+c[1]*a[1]+c[2]*a[2];},cross:function(c,a,b){return b=this.assert(b),b[0]=c[1]*a[2]-c[2]*a[1],b[1]=c[2]*a[0]-c[0]*a[2],b[2]=c[0]*a[1]-c[1]*a[0],b;},angle:function(a,b){var c=this.mag(a)*this.mag(b);if(0==c)return 0;var d=this.dot(a,b),e=.9999*c;if(d<-e||d>e){var f=this.cross(a,b);return 0<=d?Math.asin(this.mag(f)/c):Math.PI-Math.asin(this.mag(f)/c);}return Math.acos(d/c);},mix(c,a,b,d){return d=this.assert(d),d[0]=g.mix(c[0],a[0],b),d[1]=g.mix(c[1],a[1],b),d[2]=g.mix(c[2],a[2],b),d;}};return c.INFO=b,Object.freeze(b),a=void 0===a?{}:a,a.EasyCam=c,a.DampedAction=d,a.Interpolation=e,a.Rotation=f,a.Vec3=h,a.Scalar=g,a;}(Dw);p5&&(p5.prototype.createEasyCam=function(){var a=this._renderer,b=arguments[0];return arguments[0]instanceof p5.RendererGL&&(a=arguments[0],b=arguments[1]),new Dw.EasyCam(a,b);});