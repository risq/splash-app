import $ from 'jquery';
import debug from 'debug';

import tpl from './templates/posts.hbs';

const dbg = debug('app:index');

function onPostsLoaded(data) {
  const content = tpl({
    posts: data,
  });

  $('#main').append(content);
}

$(() => {
  dbg('document ready');

  $.getJSON('/posts')
    .then(onPostsLoaded);
});
