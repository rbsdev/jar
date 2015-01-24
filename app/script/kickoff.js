var assets,
    data = [ ],
    done,
    index = 0,
    kickoff,
    progress,
    total;

assets = [
  'vendor/phaser.min.js',
  'script/main.min.js',
  'image/max.png'
];

total = assets.length;

done = function() {
  var body = document.body;

  assets.forEach(function(asset, index) {
    var script;

    if (!/\.js$/.test(asset)) {
      return;
    }

    script = document.createElement('script');
    script.textContent = data[index];

    body.appendChild(script);
  });
};

kickoff = function(pxhr) {
  var asset = assets[index],
      xhr = new XMLHttpRequest();

  if ('response' in pxhr) {
    data[index - 1] = pxhr.response;
  }

  if (index === total) {
    return done();
  }

  index++;

  xhr.addEventListener('progress', progress);
  xhr.addEventListener('load', kickoff.bind(this, xhr));

  xhr.open('GET', asset);
  xhr.send();
};

progress = function(event) {
  var percent = ((event.loaded / event.total) * index) / total;

  console.log('kickoff::progress', percent);
};

window.addEventListener('load', kickoff);
