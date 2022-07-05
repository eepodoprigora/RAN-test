import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";

import {CurrentWeather} from "../types/types";

export const initialState: CurrentWeather = {
    cities: [
        {value: 'Москва', valueEng: 'Moscow'},
        {value: 'Санкт-Петербург', valueEng: 'Saint Petersburg'},
        {value: 'Самара', valueEng: 'Samara Oblast'},
        {value: 'Воронеж', valueEng: 'Voronezh'},
        {value: 'Новосибирск', valueEng: 'Novosibirsk'},
        {value: 'Астрахань', valueEng: 'Astrakhan'},
        {value: 'Владивосток', valueEng: 'Vladivostok'},
        {value: 'Вок', valueEng: 'Vok'},
    ],
    shownCities: [],
    addedTowns: [],
    addedTownError: false,
    sliderValue: 5,
    filteredCities: [],
    title: ''
}


export const getCurrentWeatherSlice = createSlice({
    name: 'current_weather',
    initialState,
    reducers: {
        fetchCurrentWeatherSuccess(state, action: PayloadAction<AxiosResponse>) {
            if (!state.shownCities.some((e: Element) => e.id === action.payload.data.id)) {
                state.shownCities.push({
                    id: action.payload.data.id,
                    name: state.cities.filter((item: any) => (item.valueEng === action.payload.data.name))[0].value,
                    nameEng: state.cities.filter((item: any) => (item.valueEng === action.payload.data.name))[0].valueEng,
                    temp: Math.round(Number(action.payload.data.main.temp) - 273.15),
                    windSpeed: Math.round(Number(action.payload.data.wind.speed)),
                    pressure: action.payload.data.main.pressure,
                    description: action.payload.data.weather[0].description
                })
            } else if (!state.addedTowns.some((e: Element) => e.id === action.payload.data.id)) {
                state.addedTowns.push({
                    id: action.payload.data.id,
                    nameEng: state.cities.filter((item: any) => (item.valueEng === action.payload.data.name))[0].valueEng,
                })
            }
            state.filteredCities = state.shownCities

        },
        removeCity: (state, action) => {
            state.shownCities = state.shownCities.filter((item: any) => {
                return item.id !== action.payload
            })
            state.filteredCities = state.shownCities
            state.addedTowns = state.addedTowns.filter((item: any) => {
                return item.id !== action.payload
            })
            state.filteredCities = state.shownCities.filter((city: any) => {
                return city.temp >= state.sliderValue
            })
        },
        filterCities: (state, action) => {
            state.sliderValue = action.payload
            state.filteredCities = state.shownCities.filter((city: any) => {
                return city.temp >= state.sliderValue
            })

        },
        setTitleToStore: (state, action) => {
            state.title = action.payload
        },
        setAddedTownError: (state, action) => {
            state.addedTowns.map((item: any) => {
                if (action.payload === item.nameEng) {
                    state.addedTownError = true
                }
            })
        },
        removeAddedTownError: (state, action) => {
            state.addedTownError = action.payload
        },
    }


})

export const {
    removeCity, filterCities, setTitleToStore, setAddedTownError, removeAddedTownError
} = getCurrentWeatherSlice.actions;

export default getCurrentWeatherSlice.reducer