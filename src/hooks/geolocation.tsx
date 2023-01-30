
import { useEffect, useState } from "react";
//https://stackblitz.com/edit/usegeolocation?file=index.tsx/

const useGeoLocation = (options?: PositionOptions) => {
  const [location, setLocation] = useState<GeolocationPosition>();
  const [err, setError] = useState<GeolocationPositionError>();

  useEffect(() => {
    const id = navigator.geolocation.watchPosition(
      pos => {
        setLocation(pos);
        err && setError(undefined);
      },
      err => setError(err),
      options
    )
  })
}