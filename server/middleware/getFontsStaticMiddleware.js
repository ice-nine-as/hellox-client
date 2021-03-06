const express = require('express');
const {
  join,
} = require('path');

const projectPath = join(__dirname, '..', '..');
const fontsPath   = join(projectPath, 'fonts');

module.exports = {
  getFontsStaticMiddleware() {
    return express.static(join(fontsPath));
  },
};