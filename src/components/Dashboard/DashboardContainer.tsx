import React, {useEffect, useState} from "react";
import {useCustomDispatch, useCustomSelector} from "../../hooks/useStoreCustom";
import {setTitleToStore} from "../../store/slices/getCurrentWeatherSlice";
import Dashboard from "./Dashboard";

const DashboardContainer = () => {
    const storeTitle = useCustomSelector(state => state.getCurrentWeatherSliceReducer.title)
    const dispatch = useCustomDispatch()
    const [title, setTitle] = useState(storeTitle)
    const [changeValue, setChangeValue] = useState(false)
    const [emptyError, setEmptyError] = useState(false)

    useEffect(() => {
        const title = localStorage.getItem('title') || 'Наименование Дашборда'
        setTitle(title)
    }, [])

    const changeTitle = () => {
        setChangeValue(true)
    }
    const getNewTitle = (event: any) => {
        const {target} = event
        console.log(target.value)
        if (target && target.value !== '') {
            const newTitle = (target as HTMLInputElement).value
            setTitle(newTitle)
            setChangeValue(false)
            localStorage.setItem('title', newTitle)
            dispatch(setTitleToStore(newTitle))
        } else {
            setEmptyError(true)
        }
    }

    return (
        <Dashboard title={title}
                   changeTitle={changeTitle}
                   changeValue={changeValue}
                   emptyError={emptyError}
                   setEmptyError={setEmptyError}
                   getNewTitle={getNewTitle}/>
    )
}

export default DashboardContainer

