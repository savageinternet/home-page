<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Savage Internet</title>
<meta name="description" content="Savage Internet is a company that works in the spaces of education and games, with expertise in hardware prototyping, software programming, fabrication, and interactive data visualization.">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="index, follow">
<link rel="stylesheet" type="text/css" href="/css/style.css" />
</head>
<body>
<div id="root">
  <div id="header">
    <div id="logo">
      <a href="/"><img src="/img/logo.svg" /></a>
    </div>
    <div id="nav">
      <span>Projects</span>
      <a href="/consulting.html">Consulting</a>
      <a href="/team.html">Team</a>
    </div>
  </div>
  <div id="body">
    <div id="main">
      <div id="tags">
        <span class="tag ed">education</span>
        <span class="tag el">electronics</span>
        <span class="tag fab">fabrication</span>
        <span class="tag g">games</span>
        <span class="tag rw">real-world</span>
        <span class="tag viz">visualization</span>
      </div>
      <div id="projects">
        {PROJECTS}
      </div>
      <div id="project_details" class="hide">
        <div id="project_details_wrapper">
          <div id="project_details_title"></div>
          <div id="project_details_description"></div>
        </div>
      </div>
    </div>
  </div>
</div>
<script src="/js/index.js"></script>
</body>
</html>
