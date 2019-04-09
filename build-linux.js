'use strict';

const builder = require('electron-builder');
const fs = require('fs');
const packagejson = JSON.parse(fs.readFileSync('./app/package.json', 'utf8'));

builder.build({
    platform: 'linux',
    config: {
        'appId': `com.example.${packagejson.name}`,
        'linux': {
            'extraResources': 'app/python/*',
            'target': 'zip',
        },
    },
});
