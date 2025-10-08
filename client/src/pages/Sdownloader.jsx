import { useState } from "react";
import './Sdownloader.css'

const Sdownloader = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoList, setvideoList] = useState([])
  const [output, setOutput] = useState("")
  const [format, setFormat] = useState("video")
  const [quality, setQuality] = useState("720")

  const handleSingleDownload = async () => {
    setUrl("")
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/sdownload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playlistUrl: url, format, quality })

      })
      const data = await res.json();
      setOutput(data.message);
      console.log('completed')
    } catch (error) {
      console.log("failed to fetch: ", error)
    } finally {
      setLoading(false);
    }

  }



  return (
    <>
      <div className="main-container">
        <h1 className="main-heading">Youtube Video Downloader</h1>


        <input
          className='input-box'
          type="text"
          value={url}
          placeholder='Paste url here'
          onChange={(e) => setUrl(e.target.value)} />
        <br /><br />

        <select name="format" className="--selector-btn" onChange={(e) => setFormat(e.target.value)}>
          <option value="video">Video</option>
          <option value="audio">Audio</option>
        </select>

        <select name="quality" className="--selector-btn" onChange={(e) => setQuality(e.target.value)}>
          <option value="1080">1080p</option>
          <option value="720">720p</option>
          <option value="480">480p</option>
          <option value="360">360p</option>
        </select>

        <div className='btn'>
          {/* <button onClick={getInfo}>getInfo</button> */}
          <button onClick={handleSingleDownload}>Download</button>

        </div>
        <br />

        {/* <div >{loading && <p>Loading...</p>}</div> */}
        {loading && <div className='loader'></div>}

        {videoList.length > 0 && (`${videoList.length} playlist videos`)}

        <div className='videolist'><ul>
          {videoList.length > 0 && (videoList.map((video, i) => {
            return <li key={i}>{video.title}</li>
          })
          )}
        </ul>
        </div>

        {output && <div>{output}</div >}


      </div>

    </>
  )
}

export default Sdownloader