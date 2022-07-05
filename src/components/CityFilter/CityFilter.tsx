import {useCustomDispatch, useCustomSelector} from "../../hooks/useStoreCustom";
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
} from '@chakra-ui/slider'
import { useState} from "react";
import {filterCities} from "../../store/slices/getCurrentWeatherSlice";


const CityFilter = () => {
    const initialValue = useCustomSelector(state => state.getCurrentWeatherSliceReducer.sliderValue)
    const dispatch = useCustomDispatch()
    const [newValue, setSliderValue] = useState(initialValue)

    const filterItems = () => {
        dispatch(filterCities(newValue))
    }


    return (<>
            <div className='dashboard__subtitle'>Где сейчас теплее, чем</div>
            <Slider aria-label='slider-ex-6' onChange={(val) => {setSliderValue(val)}}
                    onClick={filterItems}
                    min={-50} max={50} step={1}>

                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
                <SliderMark
                    value={newValue}
                    textAlign='center'
                    color='black'
                    mt='40'
                    mr='10'
                >
                    {newValue >= 0 ? `+ ${newValue}` :` ${newValue}`} &#176;С
                </SliderMark>
            </Slider>
            </>

    )
}

export default CityFilter