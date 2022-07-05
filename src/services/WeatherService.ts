import axios, {AxiosResponse} from 'axios'

export class WeatherService {
    static getCurrentWeather(city: string): Promise<AxiosResponse> {
        return axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b0a91dfd4c7b661fe998b355445dcdcd`)
    }
}