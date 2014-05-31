var split = require("split");
var util = require("util");
var Transform = require("stream").Transform;

util.inherits(ProblemStream, Transform);

function ProblemStream (options)
{
	options = options || {};
	options.objectMode = true;
	Transform.call(this, options);

	this.state = "init";

	this.problems = null;
	this.problemLength = null;
	this.currentProblem = null;
}

ProblemStream.prototype.Actions =
{
	"init": function (chunk)
	{
		this.problems = +chunk;
		return "problemLength";
	},
	"problemLength": function (chunk)
	{
		this.problemLength = +chunk;
		this.problemLength *= this.problemLength;

		this.currentProblem = [];
		this.problems--;
		return "problem";
	},
	"problem": function (chunk)
	{
		this.currentProblem.push(chunk);
		this.problemLength--;

		if (this.problemLength === 0)
		{
			this.push(this.currentProblem);
			this.problemLength = null;
			this.currentProblem = null;
			return "problemLength";
		}
		else
			return "problem";
	}
};

ProblemStream.prototype._transform = function (chunk, encoding, processed)
{
	var action = this.Actions[this.state];
	this.state = action.call(this, chunk);

	processed();
}

util.inherits(Log, Transform);
function Log (options)
{
	Transform.call(this, options);
}

Log.prototype._transform = function (chunk, en, p)
{
	console.log(chunk);
	this.push(chunk);
	p();
};

util.inherits(SolutionStream, Transform);

function SolutionStream(options)
{
	options = options || {};
	options.objectMode = true;
	Transform.call(this, options);
}

SolutionStream.prototype._transform = function (problem, encoding, processed)
{
	this.push("answer");
	processed();
};

(
	function main (process)
	{
		var problems = new ProblemStream();
		var solve = new SolutionStream();
		process.stdin.setEncoding("utf8");
		process.stdin
			.pipe(split())
			.pipe(problems)
			.pipe(new Log({ "objectMode": true }))
			.pipe(solve)
			.pipe(process.stdout);
	}
)(process);
