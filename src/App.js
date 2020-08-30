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
    axios.get(`http://ip-api.com/json/${inputRef.current.value}`)
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

    axios.get(`http://ip-api.com/json/`)
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
            <input ref={inputRef} type="text" className="form-control" placeholder="Search any IP address or domain" aria-label="Recipient's username" aria-describedby="basic-addon2" />
            <div className="input-group-append">
              <button className="btn" type="submit"><img src={Arrow} alt='Submit' /></button>
            </div>
          </div>
        </form>

        <div className='container inter-section'>
          <div id='result'> 
            {
            currentIP.status ? 
            (
              currentIP.status === 'success' ?
              <React.Fragment>
              <div className='item'>
                <h4>IP Address</h4>
                <div className='value'>{currentIP.query}</div>
              </div>
              <div className='item'>
                <h4>Location</h4>
                <div className='value'>{`${currentIP.city}, ${currentIP.region} ${currentIP.zip}`}</div>
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
                <div className='value'>{currentIP.message}, (<span>'{currentIP.query}'</span>)</div>
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
      <section id='map-container'>
        <MapComponent 
          center={[currentIP.lat, currentIP.lon]}
          error={currentIP.status === 'success' ? false : true}
          />
      </section>
      </React.Fragment>
  );

}

export default App;
