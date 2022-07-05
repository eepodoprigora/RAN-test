import {removeAddedTownError} from "../../../store/slices/getCurrentWeatherSlice";
import {useCustomDispatch} from "../../../hooks/useStoreCustom";
import {Dispatch, SetStateAction} from "react";

interface IInputSelectProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<boolean>>,
    addedTownError: boolean,
    selectedItem: string,
    setSelectedItem: Dispatch<SetStateAction<string>>
}

const InputSelect = ({setIsOpen, setError, addedTownError , selectedItem,setSelectedItem }: IInputSelectProps) => {
    const dispatch = useCustomDispatch()
    return (
        <input
            onClick={() => {
                setIsOpen(true)
                setError(false)
                if (addedTownError == true) dispatch(removeAddedTownError(false))
            }}
            placeholder="Введите город..."
            value={selectedItem}
            onChange={event => setSelectedItem(event.target.value)}
            autoComplete='off'
            className='select__input'
        />
    )
}
export default InputSelect