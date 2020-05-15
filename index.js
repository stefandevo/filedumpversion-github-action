const core = require("@actions/core");
const fs = require("fs");

try {
	let file = core.getInput("file");
	let suffix = core.getInput("suffix");
	let build = core.getInput("build");
	let offset = core.getInput("offset");

	let nextVersion = yyyymmdd() + ".";
	let wantedBuild = parseInt(build);
	if (offset) wantedBuild = parseInt(build) + parseInt(offset);
	nextVersion += wantedBuild;

	if (suffix) {
		nextVersion = nextVersion + "-" + suffix;
	}

	fs.writeFileSync(file, nextVersion, "utf8");

	core.setOutput("version", nextVersion);
} catch (error) {
	core.setFailed(error.message);
}

function yyyymmdd() {
	function twoDigit(n) {
		return (n < 10 ? "0" : "") + n;
	}

	var now = new Date();
	return (
		"" +
		now.getFullYear() +
		"." +
		twoDigit(now.getMonth() + 1) +
		"." +
		twoDigit(now.getDate())
	);
}
