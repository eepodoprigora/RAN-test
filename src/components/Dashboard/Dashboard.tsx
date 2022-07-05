import React, {Dispatch, SetStateAction} from "react";
import arrowDown from '../../images/arrow-down.png'

interface IDashboardProps {
    changeValue : boolean,
    getNewTitle: (e:any)=> void,
    title: string,
    setEmptyError: Dispatch<SetStateAction<boolean>>,
    changeTitle: () => void,
    emptyError: boolean
    }

const Dashboard = ({changeValue, getNewTitle, title, setEmptyError, changeTitle, emptyError}: IDashboardProps) => {
    return (
        <div className='dashboard'>
            {changeValue ?
                <input className='dashboard__input' onBlur={getNewTitle} defaultValue={title}
                       onFocus={() => setEmptyError(false)}/> :
                <div className='dashboard__title' onDoubleClick={changeTitle}>
                    {title}
                </div>
            }
            {emptyError &&
                <div className='dashboard__error'>
                    <span>Тут необходимо название </span>
                    <img src={arrowDown} alt=""/>
                </div>}

        </div>

    )
}

export default Dashboard