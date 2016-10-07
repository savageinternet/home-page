(function() {
  var $ = document.querySelector.bind(document),
      $$ = document.querySelectorAll.bind(document),
      $id = document.getElementById.bind(document),
      activeTagName = null,
      $tags = $$('#tags > .tag'),
      $projectsParent = $id('projects'),
      $projects = $$('#projects > .project'),
      $projectTags = $$('.project-tags > .tag'),
      $details = $id('project_details'),
      $title = $id('project_details_title'),
      $description = $id('project_details_description');

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
    });
  }

  function activateTag(tagName) {
    var tagSelector = '#tags > .tag.' + tagName;
    $(tagSelector).classList.add('active');
    var projectTagSelector = '.project-tags > .tag.' + tagName;
    $$(projectTagSelector).forEach(function($tag) {
      $tag.classList.add('active');
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

  // DETAILS BOX

  var perRow = 3,
      total = $projects.length;
  function getInsertBeforeIndex(i) {
    var j = (Math.floor(i / 3) + 1) * 3;
    return Math.min(j, total);
  }
  $projects.forEach(function($project, i) {
    var j = getInsertBeforeIndex(i);
    $project.addEventListener('click', function() {
      var title = $project.querySelector('.project-title').textContent;
      var description = $project.querySelector('.project-description').textContent;
      $title.textContent = title;
      $description.textContent = description;
      if (j === total) {
        $projectsParent.appendChild($details);
      } else {
        $projectsParent.insertBefore($details, $projects[j]);
      }
    }, false);
  });
})();
