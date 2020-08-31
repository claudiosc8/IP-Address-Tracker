import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import MapComponent from './Map.js'
import Data from './Data'
import Arrow from './images/icon-arrow.svg'
import './App.scss';

function App() {

  const [currentIP, setCurrentIP] = useState({})
  const [error, setError] = useState(false)
  const inputRef = useRef(null)

  const onSubmit = (e) => {
    e.preventDefault();
    const Reg = /([a-z0-9]+\.)*[a-z0-9]+\.[a-z]+/
    const type = Reg.test(inputRef.current.value) ? 'domain' : 'ipAddress'
    setCurrentIP({})
    setError(false)
    axios.get(`https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_TOKEN}&${type}=${inputRef.current.value}`)
      .then(function (response) {
        setCurrentIP(response.data)
        setError(false)
        inputRef.current.value = '';
      })
      .catch(function (error) {
        setError(error.response.data.messages)
        setCurrentIP({})
      })
  }

  useEffect(() => {

    axios.get(`https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_TOKEN}`)
      .then(function (response) {
        setCurrentIP(response.data)
      })
      .catch(function (error) {
        setError(error.response.data.messages)
      })

  }, [])


  return (
      
      <React.Fragment>
      <header>
        <h1>IP Address Tracker</h1>
        <form id='form' onSubmit={onSubmit}> 
          <div className="input-group">
            <input 
              ref={inputRef} 
              type="text" 
              className="form-control" 
              placeholder="Search for any IP address or domain" 
              aria-label="Search for any IP address or domain" 
              />
            <div className="input-group-append">
              <button className="btn" type="submit"><img src={Arrow} alt='Submit' /></button>
            </div>
          </div>
        </form>

        <div className='container inter-section'>
          <div id='result'> 
            <Data 
              currentIP={currentIP}
              error={error}
            />
          </div>
        </div>

      </header>
      <div id='map-container'>
        <MapComponent 
          center={currentIP.ip && [currentIP.location.lat, currentIP.location.lng]}
          error={currentIP.ip === undefined || error}
          />
      </div>
      </React.Fragment>
  );

}

export default App;
