(function() {
  var $ = document.querySelector.bind(document),
      $$ = document.querySelectorAll.bind(document),
      $id = document.getElementById.bind(document),
      activeTagName = null,
      $tags = $$('#tags > .tag'),
      $projectsParent = $id('projects'),
      $projects = $$('#projects > .project'),
      $projectTags = $$('.project-tags > .tag');

  // TAG SELECTION

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
  $projectTags.forEach(attachTagListener);
})();
