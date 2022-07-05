import {AppDispatch} from "../store";
import {WeatherService} from "../../services/WeatherService";
import {getCurrentWeatherSlice} from "../slices/getCurrentWeatherSlice";


export const fetchAsyncCurrentWeather = (payload: string) => async (dispatch: AppDispatch) => {
    try {
        const res = await WeatherService.getCurrentWeather(payload)
        console.log(res.data)
        if (res.status === 200) {
            dispatch(getCurrentWeatherSlice.actions.fetchCurrentWeatherSuccess(res))
        }
        return res
    } catch (error: any) {
          alert(`Ошибка ${error.response.status ? error.response.status : ''}. Сервер недоступен!`);


    }
}
