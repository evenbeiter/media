javascript:(async()=>{
let ep=prompt('What would you like to study today?');
const code0=`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Media Player</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
    <style>.sticky-top, .fixed-bottom{background-color:#FFF}.table-hover tbody tr:hover td, .table-hover tbody tr:hover th{color:green}.h{display:none}.s{font-size:0.7rem}
    </style>
</head>
<body>
<div id="container" class="my-2 mx-auto align-content-center" style="max-width:500px">
    <div id="top" class="sticky-top">
   <audio id="ap" controls preload="auto" class="py-3 media-document audio iPhone" src="https://raw.githubusercontent.com/evenbeiter/media/main/ME`+ep+`.mp3"></audio>
    </div>
    <div id="echo" class="mx-2">
        <table class="table">
            <tbody id="lines">`;

var txt='';
var c=0;
let lrcSrc='https://evenbeiter.github.io/echo/src/ME'+ep+'.txt';
let response = await fetch(lrcSrc);
let lrc = await response.text();
txt=getLrc(lrc);

function getLrc(a){
    let str=a.replace(/ \-\> \d\d\:\d\d\.\d\d\d\]  /g,']');
    var l = str.split("[");
    var d, e; var k='';
    var j = 0;
    for (var f = 0; f < l.length; f++) {
        if (l[f].trim() == "") {
            continue;
        }
        if (/\d\d:\d\d\.\d\d\d\]/.test(l[f])) {
            var g = l[f].indexOf("]");
            d = l[f].substr(0, g);
            e = l[f].substr(g + 1);
            var c = s2n(d);
            k += '<tr><td class="s fw-lighter">' + (++j) + '</td><td class="h">' + c +'</td><td class="tl">' + e + '</td></tr>';
        }
    }
  return k;
}

function s2n(a) {
    n = a.split(":");
    n = parseInt(n[0]) * 60 + parseFloat(n[1]);
    return n.toFixed(3);
}
  
txt=txt+'<tr class="h"><td></td><td>36000</td><td></td></tr>';

const code1=`</tbody>
  </table>
</div>
</div>


document.getElementById('lines').addEventListener('click', function (e) {
  if(e.target.nodeName === 'TD') {
      var selectedRow = e.target.parentElement;
      if (selectedRow) {
        var tr=document.querySelectorAll('tr');
        for (var i=0;i<tr.length;i++){
            tr[i].style.color='';
            tr[i].style.backgroundColor='';
        }
          selectedRow.style.color='green';
          selectedRow.style.backgroundColor='#E5E4E2';

          let startTime=Number(e.target.parentElement.children[1].textContent);
          let endTime=Number(e.target.parentElement.nextElementSibling.children[1].textContent);

audio.currentTime=startTime;
audio.play();
audio.ontimeupdate = function(){
  if (audio.currentTime > endTime){
    audio.pause();
              }  
            }
      }
  }
});
document.close();
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>
</body>
</html>`;

win=window.open('','','');void(win.document.write(code0+txt+code1));

})();