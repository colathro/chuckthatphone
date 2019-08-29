


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
      this.dataentry = true;

      this.SetupOnClicks();
   }

   SetupOnClicks() {

      document.getElementById('DataEntryYeet').addEventListener('touchstart', this.DisplayOverlay.bind(this));
      document.getElementById('YeetButton').addEventListener('touchstart', this.activateCapture.bind(this));
      document.getElementById('ScoreSubmit').addEventListener('touchstart', this.RejectScore.bind(this));
      document.getElementById('ScoreReject').addEventListener('touchstart', this.SubmitScore.bind(this));

   }

   DisplayOverlay() {
      this.ShowOverlay();
   }

   FetchOverlaySelection() {
      this.Username = document.getElementById('Username').value;

      this.Insta = document.getElementById('IsInsta').checked;
      this.Twitter = document.getElementById('IsTwitter').checked;
      this.Snapchat = document.getElementById('IsSnapchat').checked;
   }

   RejectScore() {
      this.HideOverlay();
   }

   SubmitScore() {
      this.HideScore();
      this.ShowDataEntry();
   }

   ShowOverlay() {
      document.getElementById('UserInfo').style.display = 'block';
   }

   HideOverlay() {
      document.getElementById('UserInfo').style.display = 'none';
   }

   HideCountDown() {
      document.getElementById('CountDown').style.display = 'none';
   }

   ShowCountDown() {
      document.getElementById('CountDown').style.display = 'block';
   }

   StartCountdown() {
      CountDown();
   }

   ShowScore() {
      document.getElementById("Score").style.display = 'block';
   }

   HideScore() {
      document.getElementById("Score").style.display = 'none';
   }

   UpdateScore(score) {
      document.getElementById("ScoreNumber").innerText = score;
   }

   ShowDataEntry() {
      document.getElementById("DataEntry").style.display = 'block';
   }

   HideDataEntry() {
      document.getElementById("DataEntry").style.display = 'none';
   }

   orientation(event) {
      //orientationData.push(new OrientationInstance(Math.round(event.beta), Math.round(event.gamma), Math.round(event.alpha)));
   }

   motion(event) {
      motionData.push(new MotionInstance(event.acceleration.x, event.acceleration.y, event.acceleration.z, xG, yG, zG, pos));
   }

   deactivateCapture() {
      this.HideCountDown();
      this.UpdateScore(30);
      this.ShowScore();
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
      this.ShowCountDown();
      this.ShowOverlay();
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
         str += ar[i].a + ',';
      }
      return str;
   }
}

function CountDown() {
   document.getElementById('CountDownValue').innerText = 2;
   var x = setInterval(function () {
      var val = document.getElementById('CountDownValue').innerText;

      if (val <= 1) {
         clearInterval(x);
      }

      val -= 1;

      document.getElementById('CountDownValue').innerText = val;
   }, 1000);
}

dC = new DataCapture();
