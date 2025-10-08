const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const downloadPath = path.join(__dirname,"download")

//make sure directory available
if(!fs.existsSync(downloadPath)){
  fs.mkdirSync(downloadPath)
}



// Get playlist info
app.post("/getinfo", (req, res) => {
  console.log(req.body);
  const { playlistUrl } = req.body;
  console.log("Fetching...",playlistUrl)
  const cmd = `yt-dlp --flat-playlist --dump-json "${playlistUrl}"`;

  exec(cmd, (err, stdout, stderr) => {
    if (err) return res.status(500).send(stderr);
    const items = stdout
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line));

      console.log("Request completed.")
    res.json(items);
  });
});

// Download playlist
app.post("/download", (req, res) => {
  const { playlistUrl, format,quality } = req.body;
  const output = `"${downloadPath}/%(title)s.%(ext)s"`;
  const flags = format === "audio" ? "audio" : "";
  console.log("downloading...",playlistUrl)
console.log(format,quality)
  const cmd = `yt-dlp ${flags} -S "res:${quality}" -f "bestvideo[height<=${quality}]+bestaudio/best" --merge-output-format mp4 -o ${output} "${playlistUrl}"`;


  exec(cmd, (err, stdout, stderr) => {
    if (err) return res.status(500).send(stderr);
    res.json({message: "Video Download succefully."});
  });
});

//download mp3
app.post("/mdownload", (req, res) => {
  
  const { playlistUrl} = req.body;
  if(!playlistUrl){
    return res.json({message: "please provide url."})
  }
  const output = `"${downloadPath}/%(title)s.%(ext)s"`;
  console.log("downloading MP3...",playlistUrl)
  const cmd = `yt-dlp --no-playlist -x --audio-format mp3 -o ${output} "${playlistUrl}"`;

  exec(cmd, (err, stdout, stderr) => {
    if (err) return res.status(500).send(stderr);
    res.json({message: "Audio Download succefully."});
  });
});

// Single Download playlist
app.post("/sdownload", (req, res) => {
  console.log("Request received");

  const { playlistUrl,format,quality } = req.body;

  if (!playlistUrl) {
    return res.status(400).json({ error: "playlistUrl is required" });
  }

  console.log("Downloading:", playlistUrl);
  console.log("Downloading:", format,quality);
  const flags = format === "audio" ? "audio" : "";

  // const cmd = `yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]" --merge-output-format mp4 -o "${downloadPath}/%(title)s.%(ext)s" "${playlistUrl}"`;

  // const cmd = `yt-dlp --no-playlist -S "height:${quality}" -f "bv*" "${flags}" -o "${downloadPath}/%(title)s.%(ext)s" "${playlistUrl}"`;
  // const cmd = `yt-dlp "${playlistUrl}"`

  const cmd = `yt-dlp --no-playlist -S "res:${quality}" -f "bestvideo[height<=${quality}]+bestaudio/best" --merge-output-format mp4 -o "${downloadPath}/%(title)s.%(ext)s" "${playlistUrl}"`;


  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error("yt-dlp error:", stderr);
      return res.status(500).json({ error: "Download failed", details: stderr });
    }

    console.log("yt-dlp finished:", stdout);
    res.json({ message: "Download completed successfully" });
  });
});

app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
