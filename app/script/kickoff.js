var assets,
    done,
    index = 0,
    kickoff,
    progress,
    total;

assets = [
  'script/main.min.js',
  'image/max.png'
];

total = assets.length;

done = function() {
  console.log('kickoff::done');
};

kickoff = function() {
  var asset = assets[index],
      xhr = new XMLHttpRequest();

  if (index === total) {
    return done();
  }

  index++;

  xhr.addEventListener('progress', progress);
  xhr.addEventListener('load', kickoff);

  xhr.open('GET', asset);
  xhr.send();
};

progress = function(event) {
  var percent = ((event.loaded / event.total) * index) / total;

  console.log('kickoff::progress', percent);
};

document.addEventListener('DOMContentLoaded', kickoff);
