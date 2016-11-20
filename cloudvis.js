navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
var video = document.querySelector("#videoElement");

if (navigator.getUserMedia) {
    navigator.getUserMedia({video: true}, handleVideo, videoError);
    }

function videoError(e) {
    // do something
}
function handleVideo(stream) {
    video.src = window.URL.createObjectURL(stream);

}

function subfun(){
  var canvas = document.getElementById("myCanvas");
     canvas.width = video.videoWidth;
     canvas.height = video.videoHeight;
     canvas.getContext('2d').drawImage(video, 0, 0);
     var imgData = canvas.toDataURL("img/png");
     result =  imgData.replace(/^data:image\/(png|jpg);base64,/, "");
     var data = {"requests":[{"image":{"content":result},"features":[{"type":"LABEL_DETECTION","maxResults":1}]}]};
     $.ajax({
     url: 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAzFI9CitPQnQUGyPz9eGXx8tRkoNCobGc',
     type: 'POST',
     data: JSON.stringify(data),
     headers: {
      "Content-Type": "application/json",
    },
     dataType: 'json',
     success: function(msg) {
     var result1 = JSON.stringify(msg);
     var result2 = JSON.parse(result1);

     exports.keyword = result2.responses[0].labelAnnotations[0].description;

    }
});
     //imgData = imgData.replace('data:image/png;base64, ',' ');
     //var postData = JSON.stringify({imageData: imgData});
     //alert(imgData);
  }
