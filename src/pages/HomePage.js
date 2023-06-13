
import React from 'react';
import {useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import SelectMenu from '../components/SelectMenu';
const client_id = '54453c51b44a49f6bb34a50e8c6bcdb7';
const client_secret = 'aac76ee7166549aea3fbc31d8f967f66';



function HomePage() {

    const [accessToken, setAccessToken] = useState("");
    const [track, setTrack] = useState("");
    const [possibleTrakcs, setPossibleTrakcs] = useState([])
    const [showComponent, setShowComponent] = useState(false);


    useEffect(() => {
        const authOptions = {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: 'grant_type=client_credentials'
        };
    
        fetch('https://accounts.spotify.com/api/token', authOptions)
          .then(response => response.json())
          .then(data => {
            setAccessToken(data.access_token);
            localStorage.setItem('access_token', data.access_token);
          })
          .catch(error => console.error(error));
    }, []);
    
    async function searchTrakcs(event){
        event.preventDefault();
        var params = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken}
        }

        var value = await fetch('https://api.spotify.com/v1/search?q=' + track + '&type=track&limit=10', params)
            .then(response => response.json())
            .then(data => setPossibleTrakcs(data.tracks.items))
            .then(setShowComponent(true))
    }


  return (

    <div className="flex justify-center items-center h-screen ">
    <div class="w-3/4 lg:w-1/2">
        <form  onSubmit={searchTrakcs}>    
            <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input value={track}
                       onChange={event => setTrack(event.target.value)}
                       type="text" name="track" id="track" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required></input>
                <button type="submit" class=" text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
        </form>

        {showComponent && possibleTrakcs.length != 0 ?  <SelectMenu data={possibleTrakcs}/>  : null}
    </div> 
  </div>
  )
}
export default HomePage