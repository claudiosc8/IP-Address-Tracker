import React from 'react';
import SyncLoader from "react-spinners/SyncLoader";


function Data({currentIP, error}) {

    if(error) {
      return (

        <div className='item error'>
          <h4>Error</h4>
          <div className='value'>{error}</div>
        </div>

        )
    } else if (currentIP.ip) {
      return (

      <React.Fragment>
          <div className='item'>
            <h4>IP Address</h4>
            <div className='value'>{currentIP.ip}</div>
          </div>
          <div className='item'>
            <h4>Location</h4>
            <div className='value'>{`${currentIP.location.city}, ${currentIP.location.region} ${currentIP.location.postalCode}`}</div>
          </div>
          <div className='item'>
            <h4>Timezone</h4>
            <div className='value'>UTC {currentIP.location.timezone}</div>
          </div>
          <div className='item'>
            <h4>ISP</h4>
            <div className='value'>{currentIP.isp}</div>
          </div>
        </React.Fragment>

        )
      } else {
        return (

          <SyncLoader
            size={10}
            color={"#5a79e3"}
            loading={true}
          />

          )
      }

}

export default Data;
