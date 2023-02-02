import { useState, useEffect} from 'react';

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    result: { lat: "", lng: ""}
  });

  const getLocation = (location:any) => {
    setLocation({
      loaded: true,
      result: {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      }
    })
  }
  const onError = () => {
    console.log('sorry i cant do it') 
  }
  
  useEffect(() => {
    if(!('geolocation' in navigator)){
      console.log('Geolocation is not supported by your browser');
    }
    navigator.geolocation.getCurrentPosition(getLocation, onError)
  }, [])
   
  return location;
}

export default useGeoLocation;