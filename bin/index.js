#!/usr/bin/env node

var merger = require('junit-report-merger');
var glob = require('glob');
var parser = require('./../lib/junit-xml-parser').parser;
fs = require('fs');
var swig = require('swig');
var template = swig.compileFile('emailTemplate.html');
var program = require('commander');
program
    .version('0.0.1')
    .option('-o, --output [type]', 'Output html path [dir]', process.cwd() + "/emailableReport.html")
    .option('-i, --input [type]', 'Input results directory [path]', process.cwd() + "/reports")
    .parse(process.argv);
console.log(program.input, program.output);
glob(program.input + "/**/*.xml", function (err, files) {
    merger.mergeFiles('result.xml', files, [], function (res, err) {
        fs.readFile('result.xml', 'utf8', function (err, data) {
            parser.parse(data).then(function (results) {
                fs.writeFile(program.output, template(results), function (err) {
                    if (err) {
                        return console.log(err);
                        process.exit(0);
                    } else {
                        process.exit(1);
                    }
                });
            });
        });
    });
});