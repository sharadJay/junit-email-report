var merger = require('junit-report-merger');
var glob = require('glob-fs')({gitignore: true});
var parser = require('junit-xml-parser').parser;
fs = require('fs');
var swig = require('swig');
var template = swig.compileFile('emailTemplate.html');

glob.readdir('reports/**/*.xml', function (err, files) {
    merger.mergeFiles("/Users/shjain/junit-email-report/results/result.xml", files, [], function (res, err) {
        fs.readFile('/Users/shjain/junit-email-report/results/result.xml', 'utf8', function (err, data) {
            parser.parse(data).then(function (results) {
                fs.writeFile('emailableReport.html', template(results), function (err) {
                    if (err) return console.log(err);
                });
            });
        });
    });
});

