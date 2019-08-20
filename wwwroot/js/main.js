class OrientationInstance {
   constructor(beta, gamma, alpha) {
      this.a = beta;
      this.b = gamma;
      this.c = alpha;
      this.time = Date.now();
   }
}

class MotionInstance {
   constructor(accelX, accelY, accelZ) {
      this.a = accelX;
      this.b = accelY;
      this.c = accelZ;
      this.time = Date.now();
   }
}


var motionData = new Array();
var orientationData = new Array();

class DataCapture {
   on = false;

   constructor() {
      document.getElementById('YeetButton').onclick = this.activateCapture.bind(this);
      console.log("In constructor");
   }

   orientation(event) {
      document.getElementById('beta').innerHTML = Math.round(event.beta);
      document.getElementById('gamma').innerHTML = Math.round(event.gamma);
      document.getElementById('alpha').innerHTML = Math.round(event.alpha);
      orientationData.push(new OrientationInstance(event.beta, event.gamma, event.alpha));
   }

   motion(event) {
      document.getElementById('acceleration-x').innerHTML = Math.round(event.acceleration.x);
      document.getElementById('acceleration-y').innerHTML = Math.round(event.acceleration.y);
      document.getElementById('acceleration-z').innerHTML = Math.round(event.acceleration.z);
      motionData.push(new MotionInstance(event.acceleration.x, event.acceleration.y, event.acceleration.z))
   }

   deactivateCapture() {
      if (this.on) {
         this.on = false;

         window.removeEventListener('deviceorientation', this.orientation);

         window.removeEventListener('devicemotion', this.motion);

         console.log("I don't know how to put this in the database.")
         console.log(orientationData.toString());
         console.log(motionData.toString());
         var xhr = new XMLHttpRequest();
         xhr.open("POST", "/api/yeet", true);
         xhr.setRequestHeader('Content-Type', 'application/json');
         xhr.send(JSON.stringify(
            {
               device: "Kendras Dumb Phone",
               heightmeters: 9000.00,
               yeetdetail: {
                  value: 'Orientation: ' + joinArrayObs(orientationData) + ' - Motion: ' + joinArrayObs(motionDat)
               }
            }));
      }
   }

   activateCapture() {
      console.log("Clicked Yeet.")
      if (!this.on) {
         this.on = true;
         motionData = new Array();
         orientationData = new Array();
         window.addEventListener('deviceorientation', this.orientation);

         window.addEventListener('devicemotion', this.motion);
      } else {
         console.log("Done Yeeting.");
         this.deactivateCapture();
      }
   }

   joinArrayObjs(ar) {
      var str = '';
      for (var i = 0, len = ar.length; i < len; i++) {
         str += ar[i].a + '|' + ar[i].b + '|' + ar[i].c;
      }
      return str;
   }
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