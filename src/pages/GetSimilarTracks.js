import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';




function useSpotifyToken() {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setAccessToken(localStorage.getItem("access_token"));
    }
  }, []);

  return accessToken;
}

function GetArtistId( idTrack ) {
  const token = useSpotifyToken();
  const [artistId, setArtistId] = useState(null);

  useEffect(() => {
    async function fetchArtistId() {
      const params = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };

      try {
        const response = await fetch(
          `https://api.spotify.com/v1/tracks/${idTrack}`,
          params
        );

        if (response.ok) {
          const data = await response.json();
          setArtistId(data.artists[0].id);
        } else {
          console.log("Error fetching artist ID:", response.statusText);
        }
      } catch (error) {
        console.log("Error fetching artist ID:", error);
      }
    }

    if (token && idTrack) {
      fetchArtistId();
    }
  }, [token, idTrack]);

  return artistId;
}


function GetSelectedTrack( idTrack ) {
  const token = useSpotifyToken();
  const [trackDetails, setTrackDetails] = useState(null);

  useEffect(() => {
    async function fetchArtistId() {
      const params = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };

      try {
        const response = await fetch(
          `https://api.spotify.com/v1/tracks/${idTrack}`,
          params
        );

        if (response.ok) {
          const data = await response.json();
          setTrackDetails(data);
        } else {
          console.log("Error fetching artist ID:", response.statusText);
        }
      } catch (error) {
        console.log("Error fetching artist ID:", error);
      }
    }

    if (token && idTrack) {
      fetchArtistId();
    }
  }, [token, idTrack]);

  return trackDetails;
}


function GetGenres( idArtist) {
  const token = useSpotifyToken();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchArtistGenres() {
      const params = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };

      try {
        const response = await fetch(
          `https://api.spotify.com/v1/artists/${idArtist}`,
          params
        );

        if (response.ok) {
          const data = await response.json();
          setGenres(data.genres);
        } else {
          console.log("Error fetching artist ID:", response.statusText);
        }
      } catch (error) {
        console.log("Error fetching artist ID:", error);
      }
    }

    if (token && idArtist) {
      fetchArtistGenres();
    }
  }, [token, idArtist]);

  return genres;
}


function GetReccomendations( track, artist,genres) {
  const token = useSpotifyToken();
  const [reccomendations, setReccomendations] = useState([]);

  useEffect(() => {
    async function fetchReccomandations() {
      const params = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };

      try {
        const response = await fetch(
          `https://api.spotify.com/v1/recommendations?seed_artists=${artist}&seed_genres=${genres}&seed_tracks=${track}`,
          params
        );

        if (response.ok) {
          const data = await response.json();
          setReccomendations(data.tracks);
        } else {
          console.log("Error fetching artist ID:", response.statusText);
        }
      } catch (error) {
        console.log("Error fetching artist ID:", error);
      }
    }

    if (token && track && artist && genres) {
      fetchReccomandations();
    }
  }, [token, track,artist,genres]);

  return reccomendations;
}



var isPlaying = false;

function togglePlayPreview(idAudio, idButton){
  
    var myAudio = document.getElementById(idAudio);
    var isPlaying = !myAudio.paused;
   
    if(isPlaying){
        myAudio.pause();
       document.getElementById(idButton).innerText = "Ascolta";
      }else{
        myAudio.play();
        document.getElementById(idButton).innerText = "Pausa";
      }

}



function GetSimilarTracks() {

    const {idTrack} = useParams();
    const artist = GetArtistId(idTrack);
    const selectedTrack = GetSelectedTrack(idTrack);
    console.log(selectedTrack);
    const genres = GetGenres(artist);
    const recommendations = GetReccomendations(idTrack,artist,genres);
    
    console.log("recommendations ",recommendations);
    if (!recommendations || !selectedTrack) {
      return <p>Loading track...</p>;
    }

 {recommendations.map((track) => (
          <div key={track.id}class="grid  p-2 gap-1 lg:grid-cols-6 sm:grid-cols-3 xs:grid-cols-3">
                    <div class="rounded-full bg-teal-500"><img class="w-78 h-78 rounded-full" src={track.album.images[0].url}></img></div>
                    <div class="lg:col-span-3  bg-teal-500 flex items-center justify-center ">{track.name}</div>
                    <div class="flex items-center bg-teal-500 justify-center">{track.duration_ms}</div>
                    <hr/>
          </div> 
          
      ))}

  return (
   <>
    <div class="w-full max-w-sm mx-auto mt-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center">
          <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div class="flex justify-end px-4 pt-4">
              <button id="dropdownButton" data-dropdown-toggle="dropdown" class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
              </button>
          </div>
          <div class="flex flex-col items-center pb-10">
              <img class="w-32 h-32 mb-3 rounded-full shadow-lg" src={selectedTrack.album.images[0].url} alt="Bonnie image"/>
              <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{selectedTrack.name}</h5>
              <span class="text-sm text-gray-500 dark:text-gray-400">{selectedTrack.artists[0].name}</span>
              <div class="flex mt-4 space-x-3 md:mt-6">
               
              <audio id="aud_prev" src={selectedTrack.preview_url} preload="auto"></audio>
                  <button id="btn" onClick={() => togglePlayPreview('aud_prev','btn')}  class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ascolta</button>
                  <a href={selectedTrack.external_urls.spotify} target="_blank" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-zinc-100 bg-green-700 border border-gray-300 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Spotify</a>
              </div>
          </div>
      </div>
      
    </div>
  <div class="w-full lg:max-w-3xl xs:max-w-md mx-auto mt-10 text-center">
      <div class="relative overflow-x-auto rounded-xl">
          <table class=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" class=" w-28 px-6 py-3">
                        
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Titolo 
                      </th>
                      <th scope="col" class="px-6 py-4">
                          
                      </th>
                  </tr>
              </thead>
              <tbody>
                {recommendations.map((track) => (
                    <tr key={track.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <img class=" mb-3 rounded-full shadow-lg" src={track.album.images[0].url} alt="Bonnie image"/>
                    </th>
                    <td class="px-6 py-4">
                    {track.name} - {track.artists[0].name}
                    </td>
                    <td class=" relative px-6 py-4">
                      <div class=" right-4">
                        <audio id={`aud_${track.id}`} src={track.preview_url} preload="auto"></audio>
                        <button id={`btn_${track.id}`} onClick={() => togglePlayPreview(`aud_${track.id}`, `btn_${track.id}`)} class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ascolta</button>
                      </div>
                    </td>
                </tr>
                ))}
              </tbody>
          </table>
      </div>

  </div>
</>

   
    

  
    )
  }

export default GetSimilarTracks