

class OrientationInstance {
    constructor(beta, gamma, alpha) {
        this.a = beta;
        this.b = gamma;
        this.c = alpha;
        this.time = Date.now();

        document.getElementById('grav-x').innerHTML = Math.round(event.beta);
        document.getElementById('grav-y').innerHTML = Math.round(event.gamma);
        document.getElementById('grav-z').innerHTML = Math.round(event.alpha);
        previousVec = [event.beta, event.gamma, event.alpha];
    }
}

class MotionInstance {
    constructor(accelX, accelY, accelZ) {//, gravX, gravY, gravZ, pos) {
        this.a = Math.pow(Math.abs(accelX), 2) + Math.pow(Math.abs(accelY), 2) + Math.pow(Math.abs(accelZ), 2);
        this.time = Date.now();
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
        // var A = event.acceleration.x * previousVec[0] + event.acceleration.y * previousVec[1] + event.acceleration.z * previousVec[2];
        // A = A * event.interval / 1000;
        // vel += A;
        // pos += vel;
        // if (pos > maxPos) {
        //     maxPos = pos;
        // }
        //document.getElementById('height').innerHTML = Math.round(pos);
    }
}