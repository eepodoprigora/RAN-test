import React from "react";
import sun from "../../images/sun-2.png";
import moon from "../../images/moon.png";


interface IChangeThemeProps {
    theme: string,
    changeTheme: () => void
}

const changeTheme = ({theme, changeTheme}: IChangeThemeProps) => {
    return (
        <button className='theme__button' onClick={changeTheme}>
            <img className='theme__icon' src={theme === 'light' ? sun : moon}/>
        </button>
    )
}

export default changeTheme