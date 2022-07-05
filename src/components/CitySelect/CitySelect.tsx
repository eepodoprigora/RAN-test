import {useCustomDispatch, useCustomSelector} from "../../hooks/useStoreCustom";
import {useEffect, useRef, useState} from "react";
import {fetchAsyncCurrentWeather} from "../../store/thunk/fetchCurrentWeather";
import {filterCities, setAddedTownError} from "../../store/slices/getCurrentWeatherSlice";
import Errors from "./Errors/Errors";
import OpenSelect from "./OpenSelect/OpenSelect";
import AddButton from "./AddButton/AddButton";
import InputSelect from "./InputSelect/InputSelect";


const CitySelect = () => {
    const cities = useCustomSelector(state => state.getCurrentWeatherSliceReducer.cities)
    const sliderValue = useCustomSelector(state => state.getCurrentWeatherSliceReducer.sliderValue)
    const addedTownError = useCustomSelector(state => state.getCurrentWeatherSliceReducer.addedTownError)
    const dispatch = useCustomDispatch()
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("");
    const [selectedItemEng, setSelectedItemEng] = useState("");
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    const updateCityItem = (value: string, valueEng: string) => {
        setSelectedItem(value);
        setSelectedItemEng(valueEng)
        setIsOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {

        const {current} = wrapperRef;
        if (current && !current.contains(e.target as Node)) {
            setIsOpen(false);
        }
    };
    const addSelectedItem = (value: string) => {
        if (!value) {
            setError(true)
            return
        }
        setLoading(true)
        setTimeout(async () => {
            await dispatch(fetchAsyncCurrentWeather(value))
            dispatch(filterCities(sliderValue))
            setLoading(false)
            dispatch(setAddedTownError(value))
        }, 1000)

        setSelectedItem('');
        setSelectedItemEng('')
    }

    return (<>
            <div ref={wrapperRef} className='select'>
                <InputSelect selectedItem={selectedItem}
                             addedTownError={addedTownError}
                             setError={setError}
                             setSelectedItem={setSelectedItem}
                             setIsOpen={setIsOpen}/>
                <AddButton addSelectedItem={addSelectedItem} selectedItemEng={selectedItemEng} loading={loading}/>
                <Errors error={error} addedTownError={addedTownError}/>
                <OpenSelect isOpen={isOpen} selectedItem={selectedItem} cities={cities}
                            updateCityItem={updateCityItem}/>

            </div>
        </>

    )
}

export default CitySelect