import { AJAX } from "../src/wtc-ajax";

// Initialise the history object in dev mode
AJAX.init(true);
// Set the document root for the application (if necessary)
AJAX.documentRoot = '/demo/';

function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function()
{
  // This initialises any links with AJAX attributes
  AJAX.initLinks();

  AJAX.resolveTimeout = 1000; // Remove this when not 

  // This is a manual initialisation of links and is, instead, a demonstration
  // of how programatic AJAX retrieval works.
  window.addEventListener('load', function(e) {
    document.getElementById('link_1').addEventListener('click', function(e) {
      AJAX.
        ajaxGet("/demo/page1.html", "#link1-target", ".link1-selection", e.target).
        then(function(resolver) {
          // console.log('onLoad', resolver);
          return resolver;
        });
    });
  });
});

window.AJAXObj = AJAX;
