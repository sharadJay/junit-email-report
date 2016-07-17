var _ = require('lodash');

function time(raw) {
    return +(+(raw || 0)).toFixed(2);
}

function summary(raw) {
    return {
        'tests': time(raw.testsuite.length),
        'failures': time(raw.$.failures),
        'errors': time(raw.$.errors)
    };
}

function failure(raw) {
    return {
        'type': raw.$.type,
        'message': raw.$.message,
        'raw': raw._
    };
}

function tests(raw) {
    return _(raw).map(function (test) {
        var current = (test.failure || [])[0] || {$: {}, _: ''};

        return _({
            'name': test.$.name,
            'time': time(test.$.time),
            'failure': time(test.$.failures)>0,
            'skipped': time(test.$.skipped)>0
        }).value();
    }).value();
}

function extras(raw) {
    //return {
    //  'output': (!_(raw['system-out'][0]).isObject() && raw['system-out'][0]) || '',
    //  'errors': (!_(raw['system-err'][0]).isObject() && raw['system-err'][0]) || ''
    //};
}

function from(raw) {
    var rawSuite = raw.testsuites || {$: {}};

    var parsed = {
        'tests': tests(rawSuite.testsuite),
        //'name': rawSuite.$.name, //build number
        'summary': summary(rawSuite),
    };

    return {'suite': parsed};
}

exports.from = from;
