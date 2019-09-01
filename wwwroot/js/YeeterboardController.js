class Yeeterboard {

    constructor() {
        this.topquery = "/api/yeet/top?count=10";
        this.topdevicequery = "/api/yeet/topdevice?count=10";
        this.currentpage = 1;
        this.TopDevice = false;
        this.currentdevice = '';
        // Set Leaderboard div.
        this.setupOnClicks();

        // this probablyh isn't needed
        this.setupLeaderboardElement();

        // intial log
        this.RequestYeeterboard();

        // sets the device
        this.FindDevice();
    }

    setupLeaderboardElement() {
        this.Leaderboard = document.getElementById('myList');
        console.log(this.Leaderboard);
    }

    FindDevice() {
        this.currentdevice = navigator.platform;
    }

    setupOnClicks() {
        document.getElementById('AllTimeClicked').addEventListener('touchstart', this.AllTimeClicked.bind(this));
        document.getElementById('MyDeviceClicked').addEventListener('touchstart', this.MyDeviceClicked.bind(this));
        document.getElementById('RefreshClicked').addEventListener('touchstart', this.Refresh.bind(this));
        document.getElementById('PrevClicked').addEventListener('touchstart', this.PrevClicked.bind(this));
        document.getElementById('NextClicked').addEventListener('touchstart', this.NextClicked.bind(this));
    }

    AllTimeClicked() {
        console.log('AllTimeClicked.');
        this.currentpage = 1;
        this.TopDevice = false;
        this.Refresh();
    }

    MyDeviceClicked() {
        this.currentpage = 1;
        this.TopDevice = true;
        console.log('MyDeviceClicked.');
        this.Refresh();
    }

    PrevClicked() {
        console.log('PrevClicked.');
        if (this.currentpage > 1){
            this.currentpage -= 1;
            this.Refresh();
        }
    }

    NextClicked() {
        console.log('NextClicked.');
        this.currentpage += 1;
        this.Refresh();
    }

    Refresh() {
        this.Leaderboard.innerHTML = '';
        console.log('Refreshed.');
        this.RequestYeeterboard();
    }

    RequestYeeterboard() {
        var xmlhttp = new XMLHttpRequest();
        var url = this.GetQuery();
        
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var retArr = JSON.parse(this.responseText);
                RenderYeeterboard(retArr);
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    GetQuery() {
        if (this.TopDevice){
            return this.GetTopDeviceQuery();
        }
        else {
            return this.GetTopQuery();
        }
    }

    // returns current top query
    GetTopQuery() {
        var returnquery = this.topquery;
        return returnquery += '&page=' + this.currentpage;
    }

    // returns current class state device top with current page
    GetTopDeviceQuery() {
        var returnquery = this.topdevicequery;
        returnquery += '&page=' + this.currentpage;
        return returnquery += '&device=' + this.currentdevice;
    }
}

function RenderYeeterboard(arr) {
    arr.forEach(element => {
        var node = document.createElement("li");
        if (element.instagram) {
            var instagram = document.createElement('img');
            instagram.className = 'LeaderboardIcon'
            instagram.src = '../images/Insta.png';
            node.appendChild(instagram);
        }
        if (element.snapchat){
            var snapchat = document.createElement('img');
            snapchat.className = 'LeaderboardIcon'
            snapchat.src = '../images/snapchat.png';
            node.appendChild(snapchat);
        }
        if (element.twitter){
            var twitter = document.createElement('img');
            twitter.className = 'LeaderboardIcon'
            twitter.src = '../images/twitter.png';
            node.appendChild(twitter);
        }
        var nameSpan = document.createElement('span');
        nameSpan.innerText = element.name;
        nameSpan.className = 'YeeterName';
        var heightSpan = document.createElement('span');
        heightSpan.innerText = element.heightMeters + ' feet';
        heightSpan.className = 'YeeterHeight';
        node.appendChild(nameSpan);
        node.appendChild(heightSpan);
        node.style.cssText = 'display: none'
        document.getElementById('myList').appendChild(node);
     });

    $('.rolldown-list li').each(function () {
        var delay = ($(this).index() / 10) + 's';
        $(this).css({
           webkitAnimationDelay: delay,
           mozAnimationDelay: delay,
           animationDelay: delay,
           display: 'list-item'
        });
     });

     setTimeout(function () {
        $('#myList').addClass('rolldown-list');
     }, 1);
}

const Leaderboard = new Yeeterboard();