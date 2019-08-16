if (!('ondeviceorientation' in window)) {
    document.getElementById('do-unsupported').classList.remove('hidden');
 } else {
    document.getElementById('do-info').classList.remove('hidden');

    window.addEventListener('deviceorientation', function(event) {
       document.getElementById('cube').style.webkitTransform =
       document.getElementById('cube').style.transform =
               'rotateX(' + event.beta + 'deg) ' +
               'rotateY(' + event.gamma + 'deg) ' +
               'rotateZ(' + event.alpha + 'deg)';

       document.getElementById('beta').innerHTML = Math.round(event.beta);
       document.getElementById('gamma').innerHTML = Math.round(event.gamma);
       document.getElementById('alpha').innerHTML = Math.round(event.alpha);
       document.getElementById('is-absolute').innerHTML = event.absolute ? "true" : "false";
    });
 }

 if (!('ondevicemotion' in window)) {
    document.getElementById('dm-unsupported').classList.remove('hidden');
 } else {
    document.getElementById('dm-info').classList.remove('hidden');

    window.addEventListener('devicemotion', function(event) {
       document.getElementById('acceleration-x').innerHTML = Math.round(event.acceleration.x);
       document.getElementById('acceleration-y').innerHTML = Math.round(event.acceleration.y);
       document.getElementById('acceleration-z').innerHTML = Math.round(event.acceleration.z);

       document.getElementById('acceleration-including-gravity-x').innerHTML =
               Math.round(event.accelerationIncludingGravity.x);
       document.getElementById('acceleration-including-gravity-y').innerHTML =
               Math.round(event.accelerationIncludingGravity.y);
       document.getElementById('acceleration-including-gravity-z').innerHTML =
               Math.round(event.accelerationIncludingGravity.z);

       document.getElementById('rotation-rate-beta').innerHTML = Math.round(event.rotationRate.beta);
       document.getElementById('rotation-rate-gamma').innerHTML = Math.round(event.rotationRate.gamma);
       document.getElementById('rotation-rate-alpha').innerHTML = Math.round(event.rotationRate.alpha);

       document.getElementById('interval').innerHTML = event.interval;
    });
 }

 if (!('oncompassneedscalibration' in window)) {
    document.getElementById('cnc-unsupported').classList.remove('hidden');
 } else {
    window.addEventListener('compassneedscalibration', function(event) {
       alert('Compass needs calibrating! Wave your device in a figure-eight motion');
    });
 }