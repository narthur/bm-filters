// ==UserScript==
// @name Beeminder Filters
// @namespace https://www.nathanarthur.com/
// @version 0.1
// @description Add filter buttons.
// @match https://*.beeminder.com/*
// @include https://*.beeminder.com/*
// @grant none
// @copyright 2019, Nathan Arthur (https://www.nathanarthur.com/)
// @license MIT; https://mit-license.org/
// @icon https://raw.githubusercontent.com/narthur/bm-filters/master/icons8-bee-48.png
// @homepage https://github.com/narthur/bm-filters
// @updateURL https://raw.githubusercontent.com/narthur/bm-filters/master/bm-filters.user.js
// @downloadURL https://raw.githubusercontent.com/narthur/bm-filters/master/bm-filters.user.js
// @supportURL https://github.com/narthur/bm-filters/issues
// @run-at document-end
// ==/UserScript==

// ==OpenUserJS==
// @author narthur
// ==/OpenUserJS==

(function() {
    'use strict';

    if (window.self != window.top || document.querySelector('.dashboard') === null) {
        return;
    }

    window.naFilterAgenda = function() {
        var rows = document.querySelectorAll('.goal.row'),
        midnight = new Date();
        midnight.setHours(23,59,59,0);
        var midnight_ts = midnight.getTime()/1000;

        var rows_to_hide = [...rows].filter(function(row) {
            var ts = row.getElementsByClassName('doom')[0].getAttribute('data-doom');
            return ts > midnight_ts;
        });

        rows_to_hide.forEach(function(row) {
            row.style.display = 'none';
        });
    }

    var body = document.querySelector('body'),
        content = document.querySelector('.dashboard.content'),
        wrapper = document.createElement('div');

    wrapper.innerHTML = '<a href="#" onclick="naFilterAgenda(); return false;">Agenda</a>';

    var node = body.insertBefore(wrapper, content);

    node.style.textAlign = "center";
})();
