const ffmpeg = require('ffmpeg');
const Spinner = require('cli-spinner').Spinner;
const argv = require('yargs').argv

const every_n_frames = argv.n;
const video_file_name = argv.v;
const info_only = argv.i;
let save_to = argv.t;

const start = new Date().getTime();


if (!video_file_name) {
	return console.error("must provide video file name path, e.g: \"node index.js --v=./video.mp4");
} else {
	console.log(`will process ${video_file_name}.`)
}

if (!every_n_frames && !info_only) {
	return console.error("must pass number of frames to sample by, e.g: \"node index.js --n=30");
} else if (!info_only) {
	console.log(`will extract every ${every_n_frames} frames.`);
}

if (!save_to && !info_only) {
	console.error("optional: provide frames target directory, e.g.: \" node index.js --t=./frames\". Frames will be saved into ./frames as default.");
	save_to = "./frames"
} else if (!info_only) {
	console.log(`will save frames into ${save_to} directory.`);
}


try {
	const process = new ffmpeg(video_file_name);
	process.then((video) => {
		if (info_only) {
			return console.log("duration:", video.metadata.duration, ", frames:", video.metadata.video.fps);
		}
		const total_frames = video.metadata.duration.seconds * video.metadata.video.fps;
		console.log(`will generate around ${Math.round(total_frames / every_n_frames)} image files.`);
		const spinner = new Spinner('processing.. %s');
		spinner.setSpinnerString('|/-\\');
		spinner.start();
		video.fnExtractFrameToJPG(save_to, {
			every_n_frames,
		}, (error, files) => {
			spinner.stop(true);
			if (error) {
				return console.error("error while extracting:", error);
			}
			console.log(`done in ${(new Date().getTime() - start) / 1000} seconds. ${files.length} files were generated into ${save_to} directory`);
		})
	});
} catch (e) {
	console.error("error:", e)
}
