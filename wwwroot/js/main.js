


var motionData = new Array();
var on = false;
var G = 16.087; //1/2 32.174 ft/s2
var thisTime = 0;
var maxHangTime = 0;
var falling = false;

class DataCapture {
   constructor() {
      this.dataentry = true;

      this.SetupOnClicks();
   }

   SetupOnClicks() {
      //document.getElementById('UserInfo').addEventListener('touchstart', this.HideOverlay.bind(this));
      document.getElementById('DataEntryYeet').addEventListener('touchstart', this.PostYeet.bind(this));
      document.getElementById('YeetButton').addEventListener('touchstart', this.activateCapture.bind(this));
      document.getElementById('ScoreSubmit').addEventListener('touchstart', this.SubmitScore.bind(this));
      document.getElementById('ScoreReject').addEventListener('touchstart', this.RejectScore.bind(this));

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
      this.HideCountDown();
      this.ShowDataEntry();
   }

   PostYeet() {
      this.sendYeet();
      this.HideOverlay();
      Leaderboard.Refresh();
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

   motion(event) {
      var x = new MotionInstance(event.acceleration.x, event.acceleration.y, event.acceleration.z, event.interval);
      if (!this.falling) {
         if (x.a >= 9 && x.a <= 11) {
            this.falling = true;
            this.thisTime += x.interval;
         }
      } else {
         if (x.a < 9 || x.a > 11) {
            this.falling = false;
            if (this.thisTime > this.maxHangTime) {
               this.maxHangTime = this.thisTime;
               this.thisTime = 0;
            }
         }
      }
      this.motionData.push(x);

   }

   deactivateCapture() {
      this.height = G * Math.pow(this.maxHangTime / 2 * 1000, 2);
      this.HideCountDown();
      this.UpdateScore(this.height);
      this.ShowScore();
      window.removeEventListener('devicemotion', this.motion);
      document.getElementById('ScoreNumber').innerText = this.height + ' Feet';
   }

   sendYeet() {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/yeet", true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(
         {
            device: navigator.platform,
            name: document.getElementById('Username').value,
            Instagram: document.getElementById('Insta').checked,
            Snapchat: document.getElementById('Snap').checked,
            Twitter: document.getElementById('Twitter').checked,
            heightmeters: this.height,
            yeetdetail: {
               value: 'Motion: ' + this.joinArrayObs(motionData)
            }
         }));
   }

   activateCapture() {
      this.HideScore();
      this.HideDataEntry();
      this.ShowCountDown();
      this.ShowOverlay();
      this.on = true;
      motionData = new Array();
      this.maxHangTime = 0;
      this.thisTime = 0;
      window.addEventListener('devicemotion', this.motion);
      this.StartCountdown();
      setTimeout(this.deactivateCapture.bind(this), 2000);
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
