


var motionData = new Array();
var orientationData = new Array();
var on = false;
var maxPos = 0;
var pos = 0;
var vel = 0;
var G = Math.pow(9.807, 2);
var previousVec = [0, 0, 0];

class DataCapture {
   constructor() {
      this.capturing = false;

      this.SetupOnClicks();
   }

   SetupOnClicks() {
      document.getElementById('YeetButton').addEventListener('touchstart', this.CaptureToggle.bind(this));
   }

   orientation(event) {
      //orientationData.push(new OrientationInstance(Math.round(event.beta), Math.round(event.gamma), Math.round(event.alpha)));
   }

   motion(event) {
      motionData.push(new MotionInstance(event.acceleration.x, event.acceleration.y, event.acceleration.z));
   }

   CaptureToggle () {
        if (!this.capturing){
            this.activateCapture();
            this.capturing = true;
        }
        else {
            this.capturing = false;
            this.deactivateCapture();
        }
   }

   deactivateCapture() {
      window.removeEventListener('deviceorientation', this.orientation);
      window.removeEventListener('devicemotion', this.motion);
      document.getElementById('height').innerHTML = Math.round(maxPos);
      maxPos = 0;
      pos = 0;
      vel = 0;
      previousVec = [0, 0, 0];

      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/yeet", true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(
         {
            device: navigator.platform,
            name: Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5),
            socialmedia: 1,
            heightmeters: 9000.00,
            yeetdetail: {
               value: 'Motion: ' + this.joinArrayObs(motionData)
            }
         }));
   }

   activateCapture() {
      this.on = true;
      motionData = new Array();
      orientationData = new Array();
      window.addEventListener('deviceorientation', this.orientation);
      window.addEventListener('devicemotion', this.motion);
   }

   joinArrayObs(ar) {
      var str = '';
      for (var i = 0, len = ar.length; i < len; i++) {
         str += ar[i].a + ',';
      }
      console.log(str);
      return str;
   }
}

dC = new DataCapture();
