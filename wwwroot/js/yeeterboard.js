 function yeeterBoard(arr)
 {
     
     arr.forEach(element => {
        var node = document.createElement("li");

        var nameSpan = document.createElement('span');
        nameSpan.innerText = element.name;
        nameSpan.className = 'YeeterName';
        var heightSpan = document.createElement('span');
        heightSpan.innerText = element.heightMeters;
        heightSpan.className = 'YeeterHeight';
        var deviceSpan = document.createElement('span');
        deviceSpan.innerText = element.device;
        deviceSpan.className = 'YeeterDevice';
        node.appendChild(nameSpan);
        node.appendChild(heightSpan);
        node.appendChild(deviceSpan);
        node.style.cssText = 'display: none'
            document.getElementById('myList').appendChild(node)
     });
    console.log(arr);
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

 var xmlhttp = new XMLHttpRequest();
var url = "/api/yeet/top?count=10";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        yeeterBoard(myArr);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();



