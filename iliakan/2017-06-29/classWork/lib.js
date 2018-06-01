'use strict';

function createElementFromHTML(html) {
    let tmp = document.createElement('div');
    tmp.innerHTML = html.trim();
    return tmp.firstChild;
}