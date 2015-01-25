var assets,
    ask,
    askGithub,
    data = [ ],
    done,
    error,
    grab,
    index = 0,
    kickoff,
    landing,
    load,
    meter,
    parse,
    progress,
    start,
    total,
    withGithub,
    withoutGithub;

assets = [
  'vendor/phaser.min.js',
  'script/main.js',
  'image/spaceship.png',
  'image/layer01.png',
  'image/layer02.png',
  'image/layer03.png',
  'image/nave.png'
];

total = assets.length;

ask = function() {
  withGithub.classList.add('hidden');
  withoutGithub.classList.add('hidden');

  askGithub.classList.remove('hidden');
  askGithub.focus();
};

done = function() {
  var body = document.body;

  landing.classList.add('landing-ready');

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

error = function() {
  askGithub.disabled = false;
};

grab = function(event) {
  var xhr;

  if (event.which !== 13) {
    return;
  }

  askGithub.disabled = true;

  xhr = new XMLHttpRequest();

  xhr.addEventListener('error', error);
  xhr.addEventListener('load', parse.bind(this, xhr));

  xhr.open('GET', 'https://api.github.com/users/' + askGithub.value.trim());
  xhr.send();
};

kickoff = function() {
  askGithub = document.querySelector('.landing-ask-github');
  landing = document.querySelector('.landing');
  meter = document.querySelector('.landing-progress-meter');
  withGithub = document.querySelector('.landing-with-github');
  withoutGithub = document.querySelector('.landing-without-github');

  askGithub.addEventListener('keyup', grab);
  withGithub.addEventListener('click', ask);
  withoutGithub.addEventListener('click', start);

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

parse = function(xhr) {
  var data;

  try {
    data = JSON.parse(xhr.response);
  } catch (error) {
    error(error);
  }

  start(data);
};

progress = function(event) {
  var ratio;

  if (!event.total) {
    return;
  }

  ratio = ((event.loaded / event.total) * index) / total;
  meter.style.right = ((1 - ratio) * 100).toFixed(5) + '%';
};

start = function(data) {
  withGithub.disabled = true;
  withoutGithub.disabled = true;

  landing.classList.add('hidden');

  window.main(data);
};

window.addEventListener('load', kickoff);
