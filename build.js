'use strict';

var Metalsmith = require('metalsmith'),
    markdown   = require('metalsmith-markdown'),
    layouts    = require('metalsmith-layouts'),
    define     = require('metalsmith-define'),
    permalinks = require('metalsmith-permalinks'),
    css        = require('metalsmith-clean-css'),
    fingerprint= require('metalsmith-fingerprint'),
    inPlace    = require('metalsmith-in-place'),
    multiLanguage = require('metalsmith-multi-language'),
    i18n = require('metalsmith-i18n'),
    collections = require('metalsmith-collections'),
    highlighter = require('highlighter');

const DEFAULT_LOCALE = 'en';
const LOCALES = ['fr', 'en'];

Metalsmith(__dirname)
    .source('src')
    .destination('dist')
    .use(define({
        Site: {
            url: 'www.celine-oliveira.com',
            title: 'Céline Oliveira | Hypnothérapeute à Vanves',
            description: "Accompagnement à la naissance, gestion du stress, troubles du sommeil, confiance en soi,... Venez bénéficier des bienfaits de l'hypnose pour reprendre le contrôle de vie"
        },
        googleAnalytics: '',
        owner: {
            url: '',
            name: ''
        },
        moment: require('moment')
    }))
    .use(markdown({
        "gfm": true,
        "breaks": true,
        "tables": true,
        highlight: highlighter()
    }))
    .use(permalinks({
        relative: false,
        pattern: ':title/',
    }))
    .use(css({
        files:"src/styles/*.css",
        cleanCSS: {
            rebase: true
        }
    }))
    .use(layouts({
        engine: 'jade',
        directory: 'templates',
        pattern: '**/*.html'
    }))

    .build(function (err) {
        if(err) {
            console.log(err)
        }

         console.log('Build Completed!')
    })
