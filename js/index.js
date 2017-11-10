(function() {
  var $ = document.querySelector.bind(document),
      $$ = document.querySelectorAll.bind(document),
      $id = document.getElementById.bind(document),
      body = document.body,
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

  svg.setAttribute('viewBox', viewBox());

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

  function viewBox() {
    var y = window.scrollY;
    return '0 ' + y + ' 300 ' + window.innerHeight;
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
      var p = makeShape(c, p, x, y);
      svg.appendChild(p);

      i++;
      c = chooseIndexOtherThan(colorClasses, c);
      p = chooseIndexOtherThan(paths, p);
      y += Math.round(dy * (1 + 0.05 * Math.random()));
      dy *= 1.07;
    }
  }
  
  makeRandomShapes();
  window.addEventListener('scroll', function() {
    svg.setAttribute('viewBox', viewBox());
  });

  // TAG SELECTION

  var activeTagName = null,
      $tags = $$('#tags > .tag'),
      $projectsParent = $id('projects'),
      $projects = $$('#projects > .project');

  function getTagName($tag) {
    return $tag.classList[1];
  }

  function deactivateTag(tagName) {
    var tagSelector = '#tags > .tag.' + tagName;
    $(tagSelector).classList.remove('active');
    var projectTagSelector = '.project-tags > .tag.' + tagName;
    $$(projectTagSelector).forEach(function($tag) {
      $tag.classList.remove('active');
      var $wrapper = $tag.parentNode.parentNode;
      $wrapper.classList.remove(tagName);
    });
  }

  function activateTag(tagName) {
    var tagSelector = '#tags > .tag.' + tagName;
    $(tagSelector).classList.add('active');
    var projectTagSelector = '.project-tags > .tag.' + tagName;
    $$(projectTagSelector).forEach(function($tag) {
      $tag.classList.add('active');
      var $wrapper = $tag.parentNode.parentNode;
      $wrapper.classList.add(tagName);
    });
  }

  function clearActiveTagName() {
    deactivateTag(activeTagName);
    activeTagName = null;
  }

  function setActiveTagName(tagName) {
    if (activeTagName !== null) {
      deactivateTag(activeTagName);
    }
    activeTagName = tagName;
    activateTag(activeTagName);
  }

  function attachTagListener($tag) {
    var tagName = getTagName($tag);
    $tag.addEventListener('click', function() {
      if (tagName === activeTagName) {
        clearActiveTagName();
      } else {
        setActiveTagName(tagName);
      }
    }, false);
  }

  $tags.forEach(attachTagListener);
})();
