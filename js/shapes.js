window.$ = document.querySelector.bind(document);
window.$$ = document.querySelectorAll.bind(document);
window.$id = document.getElementById.bind(document);

(function() {
  var body = document.body,
      html = document.documentElement;

  // see https://stackoverflow.com/questions/1145850/how-to-get-height-of-entire-document-with-javascript
  function getPageHeight() {
    return Math.max(
      body.scrollHeight,
      body.offsetHeight, 
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight);
  }

  // SVG SHAPES
  
  var svg = $id('shapes'),
      colorClasses = 'rbyg',
      sides = [3, 4, 5, 6],
      paths = sides.map(path),
      pageHeight = getPageHeight();

  svg.setAttribute('height', pageHeight);

  function chooseIndexOtherThan(xs, i) {
    var j = i;
    while (j === i) {
      j = Math.floor(Math.random() * xs.length);
    }
    return j;
  }

  function path(n) {
    var parts = ['M 50 0'];
    for (var i = 1; i < n; i++) {
      var theta = i * 2 * Math.PI / n,
          x = 50 * Math.cos(theta),
          y = 50 * Math.sin(theta);
      parts.push('L ' + x.toPrecision(3) + ' ' + y.toPrecision(3));
    }
    parts.push('Z');
    return parts.join('');
  }

  function transform(x, y, theta) {
    return 'translate(' + x + ', ' + y + ') rotate(' + theta + ')';
  }

  function makeShape(c, p, x, y) {
    var colorClass = colorClasses[c],
        d = paths[p],
        theta = Math.floor(360 * Math.random()),
        p = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    p.classList.add(colorClass);
    p.setAttribute('d', d);
    p.setAttribute('transform', transform(x, y, theta));
    return p;
  }

  function makeRandomShapes() {
    var i = 0,
        c = chooseIndexOtherThan(colorClasses, -1),
        p = chooseIndexOtherThan(paths, -1),
        x,
        y = 25,
        dy = 25.0;
    while (y < pageHeight) {
      x = 20 + Math.round(80 * Math.random());
      if (i % 2 === 0) {
        x += 80;
      }
      if (i % 5 === 0) {
        x += 80;
      }
      var shape = makeShape(c, p, x, y);
      svg.appendChild(shape);

      i++;
      c = chooseIndexOtherThan(colorClasses, c);
      p = chooseIndexOtherThan(paths, p);
      y += Math.round(dy * (1 + 0.05 * Math.random()));
      dy *= 1.07;
    }
  }

  function debounce(fn, t) {
    var timeout = null;
    return function() {
      if (timeout !== null) {
        window.clearTimeout(timeout);
      }
      timeout = window.setTimeout(fn, t);
    };
  }

  function onresize() {
    svg.innerHTML = '';
    svg.setAttribute('height', 0);
    pageHeight = getPageHeight();
    svg.setAttribute('height', pageHeight);
    makeRandomShapes();
  }

  makeRandomShapes();
  window.addEventListener('resize', debounce(onresize, 250));
})();
