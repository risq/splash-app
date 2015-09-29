import $ from 'jquery';
import debug from 'debug';

import gyro from './scripts/gyro';
import tpl from './templates/posts.hbs';

const dbg = debug('splash:index');

function onPostsLoaded(data) {
  const content = tpl({
    posts: data,
  });

  // $('#main').append(content);
}

$(() => {
  dbg('document ready');
  gyro.init();
  $.getJSON('/posts')
    .then(onPostsLoaded);
});
