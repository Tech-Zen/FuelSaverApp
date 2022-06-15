import axios from 'axios';
import { places_api_key } from '../private/placesAPIKey';

const PlacesServer = axios.create({ 
    baseURL: `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
}); 

PlacesServer.interceptors.request.use(
    async (config) => {
        //sets header to get JSON data from News API
        config.headers.Accept = 'application/json';
        //console.log(config);
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export const getGasStations = async (callback, lat, lon) => {
    const response = await PlacesServer.get(
        //`?location=${lat},${lon}&radius=5000&type=gas_station&key=${places_api_key}`
    );
    console.log(response.data);
    callback(response.data);
};

export default PlacesServer;