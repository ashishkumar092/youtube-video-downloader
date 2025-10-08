import { useState } from 'react';
import './Home.css'

const Home = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoList, setvideoList] = useState([])
  const [output, setOutput] = useState("")
  const [format, setFormat] = useState("video")
  const [quality, setQuality] = useState('720');

  const getInfo = async () => {
    try {
      setUrl("")
      setLoading(true);
      const res = await fetch('http://localhost:3000/getinfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playlistUrl: url, format })
      })

      const data = await res.json()
      setvideoList(data)
      setLoading(false);
    }
    catch (error) {
      console.log("Failed to get Info")
    } finally {
      setLoading(false);
    }

  }

  const handleDownload = async () => {
    setUrl("")
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playlistUrl: url, format, quality })

      })

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }


      const data = await res.json();
      // setOutput(data)
      console.log("request completed", data)
      console.log(data.message);
    }
    catch (e) {
      console.log('Failed to Download')
    } finally {
      setLoading(false);
    }

  }

  const handleMp3 = async () => {
    try {
      setUrl("")
      setLoading(true);

      const res = await fetch('http://localhost:3000/mdownload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playlistUrl: url })
      })

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const data = await res.json()
      setOutput(data.message)

    } catch (error) {
      console.log(error, "Failed to download")
    } finally {
      setLoading(false);
    }
  }


  return (
    <>

      <div className='main-container'>
        <h1 className='main-heading'>Youtube Playlist Downloader</h1>
        <input
          className='input-box'
          type="text"
          value={url}
          placeholder='Paste url here'
          onChange={(e) => setUrl(e.target.value)} />
        <br /><br />

        <select name="format" className="format-selector --selector-btn" onChange={(e) => setFormat(e.target.value)}>
          <option value="video">Video</option>
          <option value="audio">Audio</option>
        </select>

        <select name="quality" className="quality-selector --selector-btn" onChange={(e) => setQuality(e.target.value)}>
          <option value="1080">1080p</option>
          <option value="720">720p</option>
          <option value="480">480p</option>
          <option value="360">360p</option>
        </select>

        <div className='btn'>
          <button onClick={getInfo}>getInfo</button>
          <button onClick={handleDownload}>Download</button>
          <button onClick={handleMp3}>MP3 Download</button>

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

export default Home