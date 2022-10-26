let express = require('express');
let bodyParser = require('body-parser');

let app = express();
let port = process.env.PORT || 3525;

const { downloadRelease } = require('@terascope/fetch-github-release');

const user = 'some user';
const repo = 'some repo';
const outputdir = 'some output directory';
const leaveZipped = false;
const disableLogging = false;


// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
	res.status(200).send({
		message: 'GET Home route working fine!'
	});
});

app.listen(port, function(){
	console.log(`Server running in http://localhost:${port}`);

	const { downloadRelease } = require('@terascope/fetch-github-release');

	const user = 'ARM-developer';
	const repo = 'auto-update-node-app';
	const outputdir = './';
	const leaveZipped = false;
	const disableLogging = false;

	// Define a function to filter releases.
	function filterRelease(release) {
		// Filter out prereleases.
		console.log({release});
		return release.prerelease === false;
	}

	// Define a function to filter assets.
	function filterAsset(asset) {
		console.log({asset});
		// Select assets that contain the string 'windows'.
		return asset.name.includes('windows');
	}

	downloadRelease(user, repo, outputdir, filterRelease, filterAsset, leaveZipped, disableLogging)
	.then(function() {
		console.log('All done!');
	})
	.catch(function(err) {
		console.error(err.message);
	});
});