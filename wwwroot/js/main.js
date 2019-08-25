class OrientationInstance {
   constructor(beta, gamma, alpha) {
      this.a = beta;
      this.b = gamma;
      this.c = alpha;
      this.time = Date.now();
   }
}

class MotionInstance {
   constructor(accelX, accelY, accelZ, gravX, gravY, gravZ, pos) {
      this.a = accelX;
      this.b = accelY;
      this.c = accelZ;
      this.gravX = gravX;
      this.gravY = gravY;
      this.gravZ = gravZ;
      this.pos = pos;
      this.time = Date.now();
   }
}


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
      this.dataentry = false;

      this.SetupOnClicks();
   }

   SetupOnClicks () {

      document.getElementById('YeetButton').addEventListener('touchstart', this.DisplayOverlay.bind(this));
      document.getElementById('DataEntryYeet').addEventListener('touchstart', this.activateCapture.bind(this));
   }

   DisplayOverlay () {
      this.ShowOverlay();
   }

   FetchOverlaySelection () {
      this.Username = document.getElementById('Username').value;

      this.Insta = document.getElementById('IsInsta').checked;
      this.Twitter = document.getElementById('IsTwitter').checked;
      this.Snapchat = document.getElementById('IsSnapchat').checked;
   }

   ShowOverlay () {
      document.getElementById('UserInfo').style.display = 'block';
   }

   HideOverlay () {
      document.getElementById('UserInfo').style.display = 'none';
   }

   StartCountdown () {
      CountDown();
   }

   ToggleDataEntry () {
      if (this.dataentry){
         document.getElementById('CountDown').style.display = 'none';
         document.getElementById('DataEntry').style.display = 'block';
         this.dataentry = false;
      }
      else {
         this.dataentry = true;
         document.getElementById('DataEntry').style.display = 'none';
         document.getElementById('CountDown').style.display = 'block';
      }

   }

   orientation(event) {
      document.getElementById('grav-x').innerHTML = Math.round(event.beta);
      document.getElementById('grav-y').innerHTML = Math.round(event.gamma);
      document.getElementById('grav-z').innerHTML = Math.round(event.alpha);
      previousVec = [event.beta, event.gamma, event.alpha];
      //orientationData.push(new OrientationInstance(Math.round(event.beta), Math.round(event.gamma), Math.round(event.alpha)));
   }

   motion(event) {
      document.getElementById('acceleration-x').innerHTML = Math.round(event.acceleration.x);
      document.getElementById('acceleration-y').innerHTML = Math.round(event.acceleration.y);
      document.getElementById('acceleration-z').innerHTML = Math.round(event.acceleration.z);

      // document.getElementById('grav-x').innerHTML = Math.round(event.accelerationIncludingGravity.x);
      // document.getElementById('grav-y').innerHTML = Math.round(event.accelerationIncludingGravity.y);
      // document.getElementById('grav-z').innerHTML = Math.round(event.accelerationIncludingGravity.z);

      // var xG = event.accelerationIncludingGravity.x - event.acceleration.x;
      // var yG = event.accelerationIncludingGravity.y - event.acceleration.y;
      // var zG = event.accelerationIncludingGravity.z - event.acceleration.z;
      // xG = Math.pow(xG, 2);
      // yG = Math.pow(yG, 2);
      // zG = Math.pow(zG, 2);
      // if (xG + yG + zG > G - 2 && xG + yG + zG < G + 2) {
      //    previousVec = [xG / G, yG / G, zG / G];
      // }
      var A = event.acceleration.x * previousVec[0] + event.acceleration.y * previousVec[1] + event.acceleration.z * previousVec[2];
      A = A * event.interval / 1000;
      vel += A;
      pos += vel;
      if (pos > maxPos) {
         maxPos = pos;
      }
      document.getElementById('height').innerHTML = Math.round(pos);

      motionData.push(new MotionInstance(event.acceleration.x, event.acceleration.y, event.acceleration.z, xG, yG, zG, pos));

   }

   deactivateCapture() {
      this.ToggleDataEntry();
      this.HideOverlay();
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
                  value: 'Orientation: ' + this.joinArrayObs(orientationData) + ' - Motion: ' + this.joinArrayObs(motionData)
               }
            }));
   }

   activateCapture() {
      this.ToggleDataEntry();
      this.on = true;
      motionData = new Array();
      orientationData = new Array();
      window.addEventListener('deviceorientation', this.orientation);

      window.addEventListener('devicemotion', this.motion);
      this.StartCountdown();
      setTimeout(this.deactivateCapture.bind(this), 10000);
   }

   joinArrayObs(ar) {
      var str = '';
      for (var i = 0, len = ar.length; i < len; i++) {
         str += '{' + ar[i].a + ',' + ar[i].b + ',' + ar[i].c + ',' + ar[i].gravX + ',' + ar[i].gravY + ',' + ar[i].gravZ + ',' + ar[i].time + ',' + ar[i].pos + '},'
      }
      return str;
   }
}

function CountDown () {
   document.getElementById('CountDownValue').innerText = 10;
   var x = setInterval(function() {
      var val = document.getElementById('CountDownValue').innerText;

      if (val <= 1){
         clearInterval(x);
      }

      val -= 1;

      document.getElementById('CountDownValue').innerText = val;
   }, 1000);
}

dC = new DataCapture();


// if (!('ondeviceorientation' in window)) {
//    document.getElementById('do-unsupported').classList.remove('hidden');
// } else {
//    document.getElementById('do-info').classList.remove('hidden');

//    window.addEventListener('deviceorientation', function (event) {
//       document.getElementById('cube').style.webkitTransform =
//          document.getElementById('cube').style.transform =
//          'rotateX(' + event.beta + 'deg) ' +
//          'rotateY(' + event.gamma + 'deg) ' +
//          'rotateZ(' + event.alpha + 'deg)';

//       document.getElementById('beta').innerHTML = Math.round(event.beta);
//       document.getElementById('gamma').innerHTML = Math.round(event.gamma);
//       document.getElementById('alpha').innerHTML = Math.round(event.alpha);
//       document.getElementById('is-absolute').innerHTML = event.absolute ? "true" : "false";
//    });
// }

// if (!('ondevicemotion' in window)) {
//    document.getElementById('dm-unsupported').classList.remove('hidden');
// } else {
//    document.getElementById('dm-info').classList.remove('hidden');

//    window.addEventListener('devicemotion', function (event) {
//       document.getElementById('acceleration-x').innerHTML = Math.round(event.acceleration.x);
//       document.getElementById('acceleration-y').innerHTML = Math.round(event.acceleration.y);
//       document.getElementById('acceleration-z').innerHTML = Math.round(event.acceleration.z);

//       document.getElementById('acceleration-including-gravity-x').innerHTML =
//          Math.round(event.accelerationIncludingGravity.x);
//       document.getElementById('acceleration-including-gravity-y').innerHTML =
//          Math.round(event.accelerationIncludingGravity.y);
//       document.getElementById('acceleration-including-gravity-z').innerHTML =
//          Math.round(event.accelerationIncludingGravity.z);

//       document.getElementById('rotation-rate-beta').innerHTML = Math.round(event.rotationRate.beta);
//       document.getElementById('rotation-rate-gamma').innerHTML = Math.round(event.rotationRate.gamma);
//       document.getElementById('rotation-rate-alpha').innerHTML = Math.round(event.rotationRate.alpha);

//       document.getElementById('interval').innerHTML = event.interval;
//    });
// }

// if (!('oncompassneedscalibration' in window)) {
//    document.getElementById('cnc-unsupported').classList.remove('hidden');
// } else {
//    window.addEventListener('compassneedscalibration', function (event) {
//       alert('Compass needs calibrating! Wave your device in a figure-eight motion');
//    });
// }
