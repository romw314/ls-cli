const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { argv: { _: argv, r: recurse, t: type, R: regex, O: regexOpts, j: json, f: full } } = yargs(hideBin(process.argv))
	.alias('r', 'recurse').boolean('r').default('r', false)
	.alias('t', 'type').string('t').default('t', 'all')
	.alias('R', 'regex').string('R').default('R', '')
	.alias('O', 'regex-opts').string('O').default('O', '')
	.alias('j', 'json').boolean('j').default('j', false)
	.alias('f', 'full').boolean('f').default('f', false);

const ls = require('ls');

const result = ls(argv[0] ?? './*', { recurse, type }, new RegExp(regex, regexOpts));
if (json)
	console.log(JSON.stringify(result));
else if (full)
	result.forEach(file => console.log(String(file.full)));
else
	result.forEach(file => console.log(String(file.name)));
