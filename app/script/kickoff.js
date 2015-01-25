var ask,
    assets,
    data = [ ],
    dom,
    done,
    index = 0,
    kickoff,
    load,
    progress,
    start,
    total;

assets = [
  'vendor/phaser.min.js',
  'script/main.js',
  'image/layer01.png',
  'image/layer02.png',
  'image/layer03.png',
  'image/nave.png',
  'image/spaceship.png'
];

dom = {
  landing: '.landing',
  skip: '.landing-skip',
  use: '.landing-use'
};

total = assets.length;

ask = function() {

};

done = function() {
  var body = document.body;

  dom.landing.classList.add('landing-open');

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

kickoff = function() {
  dom.landing = document.querySelector(dom.landing);
  dom.skip = document.querySelector(dom.skip);
  dom.use = document.querySelector(dom.use);

  dom.skip.addEventListener('click', start);
  dom.use.addEventListener('click', ask);

  load();
};

load = function(pxhr) {
  var asset = assets[index],
      xhr = new XMLHttpRequest();

  if (pxhr && 'response' in pxhr) {
    data[index - 1] = pxhr.response;
  }

  if (index === total) {
    return done();
  }

  index++;

  xhr.addEventListener('progress', progress);
  xhr.addEventListener('load', load.bind(this, xhr));

  xhr.open('GET', asset);
  xhr.send();
};

progress = function(event) {
  var ratio;

  if (!event.total) {
    return;
  }

  ratio = ((index - 1) + (event.loaded / event.total)) / total;
  dom.landing.style.right = ((1 - ratio) * 100).toFixed(5) + '%';
};

start = function(data) {
  dom.landing.style.display = 'none';
  window.main(data);
};

window.addEventListener('load', kickoff);
