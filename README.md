# Video Frames
Generate images from video (every N frames) Using fnExtractFrameToJPG from [ffmpeg](https://www.npmjs.com/package/ffmpeg) npm package.

This is an initial quick version, just to be searchable and people ccan quickly do this task without wasting time.
Feel free to optimize, improve and add features.

### Run example:
```console
node index --v=./video.mp4 -n=100
```
Where:
* -v  - the filename path
* -n  - extract photo each N frames

#### Optional:
* pass --i to just get the file duration and the frame rate.
