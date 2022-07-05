import {useCustomDispatch, useCustomSelector} from "../../hooks/useStoreCustom";
import clearSky from '../../images/clear-sky.png'
import clouds from '../../images/clouds-2.png'
import scatteredClouds from '../../images/scattered-clouds.png'
import brokenClouds from '../../images/broken-clouds.png'
import fewClouds from '../../images/few-clouds.png'
import defaultWeather from '../../images/default-weather.png'
import {removeCity} from '../../store/slices/getCurrentWeatherSlice'

type City = {
    id: string,
    name: string,
    temp: string,
    windSpeed: string,
    pressure: string,
    description: any
}

const CitiesShown = () => {
    const filteredCities = useCustomSelector(state => state.getCurrentWeatherSliceReducer.filteredCities)
    const dispatch = useCustomDispatch()

    const deleteItem = (id: string) => {
        dispatch(removeCity(id))
    }
    const renderSwitch = (param: any) => {
        switch(param) {
            case 'clear sky':
                return clearSky;
            case 'overcast clouds':
                return clouds;
            case 'scattered clouds':
                return scatteredClouds;
            case 'broken clouds' :
                return brokenClouds;
            case 'few clouds' :
                return fewClouds;
            default:
                return defaultWeather;
        }
    }
    return <div className='shown__container'>
        {filteredCities?.map((city: City) =>
            <div key={city.id} className='shown__card'>
                <button onClick={() =>deleteItem(city.id)} className='shown__close'>&#10006;</button>
                <div className='shown__city'>{city.name} </div>
                <div className='shown__temp-container'>
                    <img className='shown__icon' src={renderSwitch(city.description)} alt="" />
                    <span className='shown__temp'>+{city.temp} &#176;С</span>
                </div>
                <div className='show__wind'>Ветер: <span>{city.windSpeed}</span> м/c</div>
                <div className='show__pressure'>Давление: {city.pressure} мм</div>
            </div>)
        }
    </div>
}

export default CitiesShown