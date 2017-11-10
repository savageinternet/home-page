import pystache

import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.realpath(__file__))
IN_DIR = os.path.join(ROOT, 'content')
PROJECTS_FILENAME = os.path.join(IN_DIR, 'projects.json')
OUT_DIR = os.path.join(ROOT, 'build')

RENDERER = pystache.Renderer(search_dirs=[IN_DIR])
TEMPLATE_CACHE = {}


def render(template_name, data):
    if template_name not in TEMPLATE_CACHE:
        template_path = os.path.join(IN_DIR, template_name + '.mustache')
        with open(template_path) as template_file:
            template_str = template_file.read()
            TEMPLATE_CACHE[template_name] = pystache.parse(template_str)
    return RENDERER.render(TEMPLATE_CACHE[template_name], data)


def make_page(filename, html):
    path = os.path.join(OUT_DIR, filename)
    print('Generating {0}...'.format(path))
    with open(path, 'w+') as f:
        f.write(html)


def make_index_page(projects):
    html = render('index', {
        'pageTitle': 'Savage Internet',
        'projects': projects
    })
    make_page('index.html', html)

def make_project_pages(projects):
    for project in projects:
        html = render('projectPage', {
            'pageTitle': project['title'] + ' - Savage Internet',
            'project': project
        })
        make_page(project['filename'], html)


def load_json(fname):
    with open(fname) as jsonFile:
        return json.load(jsonFile)


def get_project_filename(project):
    title = project.get('titleShort', project['title'])
    title = title.lower()
    title = re.sub('[!@#$\'\. ,:&]+', '-', title)
    title = title.strip('-')
    return title + '.html'

def add_tag_longnames(tags):
    longnames = {
      'ed':'education',
      'el':'electronics',
      'fab':'fabrication',
      'g':'games',
      'rw':'real-world',
      'sw':'software',
      'viz':'visualization'
    }
    return list(map(lambda x:{'short':x, 'long':longnames[x]}, tags))

def main():
    projects = load_json(PROJECTS_FILENAME)
    for project in projects:
      project['filename'] = get_project_filename(project)
      project['tags'] = add_tag_longnames(project['tags'])
    make_index_page(projects)
    make_project_pages(projects)


if __name__ == '__main__':
    main()
