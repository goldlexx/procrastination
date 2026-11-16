const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');

function loadPage(randomValue) {
  const elements = {
    '.button': { addEventListener(_event, handler) { this.onClick = handler; } },
    '.phrase': { textContent: '' },
    '.advice': { style: {} },
    '.image': { src: '' },
  };
  const context = {
    document: { querySelector: (selector) => elements[selector] },
    Math: { floor: Math.floor, random: () => randomValue },
    smoothly: (element, property, value) => { element[property] = value; },
  };

  vm.runInNewContext(source, context);
  return elements;
}

test('shows the initial suggestion and matching image', () => {
  const elements = loadPage(0);

  assert.equal(elements['.phrase'].textContent, 'разобраться, о чём поют рэперы');
  assert.match(elements['.image'].src, /\/3\.png$/);
});

test('button selects a random suggestion and adjusts long text size', () => {
  const elements = loadPage(0.75);

  elements['.button'].onClick();

  assert.equal(elements['.phrase'].textContent, 'попасть в поток грустных песен и вспомнить все ошибки молодости');
  assert.match(elements['.image'].src, /\/8\.png$/);
  assert.equal(elements['.advice'].style.fontSize, '33px');
});
