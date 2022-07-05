import React, {useEffect} from 'react';
import CitySelect from "./components/CitySelect/CitySelect";
import CitiesShown from "./components/CitiesShown/CitiesShown";
import CityFilter from "./components/CityFilter/CityFilter";
import {fetchAsyncCurrentWeather} from "./store/thunk/fetchCurrentWeather";
import {useCustomDispatch, useCustomSelector} from "./hooks/useStoreCustom";
import {useTheme} from './hooks/useTheme'
import ChangeTheme from "./components/ChangeTheme/ChangeTheme";
import DashboardContainer from './components/Dashboard/DashboardContainer'


function App() {
    const cities = useCustomSelector(state => state.getCurrentWeatherSliceReducer.shownCities)
    const {theme, setTheme} = useTheme()
    const dispatch = useCustomDispatch()
    useEffect(() => {
        const chosenTheme = localStorage.getItem('theme') || theme
        setTheme(chosenTheme)
        setInterval(() => {
            cities.map((item: any) => {
                dispatch(fetchAsyncCurrentWeather(item.nameEng))
            })
        }, 600000)
    }, [cities])

    const changeTheme = () => {
        if (theme === 'light') {
            setTheme('dark')
            localStorage.setItem('theme', 'dark')
        }
        if (theme === 'dark') {
            setTheme('light')
            localStorage.setItem('theme', 'light')
        }

    }
    return (
        <div className='container'>
            <ChangeTheme changeTheme={changeTheme} theme={theme}/>
            <CitySelect/>
            <DashboardContainer/>
            <CityFilter/>
            <CitiesShown/>
        </div>
    );
}

export default App;
