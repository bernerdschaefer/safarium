var $$ = function () { return document.querySelectorAll.apply(document, arguments) }

var safarium = {};

safarium.keydown = function(e) {
  if ( e.keyCode == 9 && !e.altKey ) {
    safarium.tab(e);
  }
  else if ( e.keyCode == 13 && e.metaKey ) {
    safarium.submitInTab(e);
  }
}

safarium.submitInTab = function(e) {
  var submit_button = e.srcElement.form.querySelector("input[type=submit], input[type=image]");
  if ( submit_button ) {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, true, 0, null);
    submit_button.dispatchEvent(evt);
  }
}

safarium.tab = function(e) {
  var form_elements = [];
  var form_element;

  var nodelist = $$("input:not([type=hidden]):not([type=submit]):not([type=button]):not([type=image]), textarea, select");
  for ( var i = 0; i < nodelist.length; i++ ) {
    var element = nodelist.item(i);
    if ( element.style.display != "none" && element.style.visibility != "hidden" ) {
      form_elements.push(nodelist.item(i));
    }
  }
  nodelist = null;

  if ( e.shiftKey )
    form_elements.reverse

  for ( var i = 0; i < form_elements.length; i++ ) {
    var element = form_elements[i];

    if ( element.style.display == "none" || element.style.visibility == "hidden" ) {
      continue;
    }
    else if ( element == e.srcElement ) {
      form_element = form_elements[i+1] || form_elements[0];
      break;
    }
    else if ( !form_element ) {
      form_element = element;
    }
  }
  form_elements = null;

  form_element.focus();
  e.preventDefault();
}

window.addEventListener('keydown', safarium.keydown, true);
