import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import MapComponent from './Map.js'
import Arrow from './images/icon-arrow.svg'
import SyncLoader from "react-spinners/SyncLoader";
import './App.scss';

function App() {

  const [currentIP, setCurrentIP] = useState({})
  const inputRef = useRef(null)

  const onSubmit = (e) => {
    e.preventDefault();
    axios.get(`https://ipwhois.app/json/${inputRef.current.value}`)
      .then(function (response) {
        setCurrentIP(response.data)
        inputRef.current.value = '';
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  useEffect(() => {

    axios.get(`https://ipwhois.app/json/`)
      .then(function (response) {
        setCurrentIP(response.data)
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
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
              placeholder="Search any IP address" 
              aria-label="Search any IP address" 
              pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$"
              />
            <div className="input-group-append">
              <button className="btn" type="submit"><img src={Arrow} alt='Submit' /></button>
            </div>
          </div>
        </form>

        <div className='container inter-section'>
          <div id='result'> 
            {
            currentIP.success !== undefined ? 
            (
              currentIP.success === true ?
              <React.Fragment>
              <div className='item'>
                <h4>IP Address</h4>
                <div className='value'>{currentIP.ip}</div>
              </div>
              <div className='item'>
                <h4>Location</h4>
                <div className='value'>{`${currentIP.city}, ${currentIP.region}, ${currentIP.country}`}</div>
              </div>
              <div className='item'>
                <h4>Timezone</h4>
                <div className='value'>{currentIP.timezone}</div>
              </div>
              <div className='item'>
                <h4>ISP</h4>
                <div className='value'>{currentIP.isp}</div>
              </div>
              </React.Fragment>
              : 
              <React.Fragment>
              <div className='item error'>
                <h4>Error</h4>
                <div className='value'>{currentIP.message}</div>
              </div>
              </React.Fragment>
            )
            : <SyncLoader
              size={10}
              color={"#5a79e3"}
              loading={true}
            />
            }
          </div>
        </div>

      </header>
      <div id='map-container'>
        <MapComponent 
          center={[currentIP.latitude, currentIP.longitude]}
          error={currentIP.success ? false : true}
          />
      </div>
      </React.Fragment>
  );

}

export default App;
