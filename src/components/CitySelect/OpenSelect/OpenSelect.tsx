type City = {
    value: string,
    valueEng: string
}

interface IOpenSelect {
    isOpen: boolean,
    cities: any[],
    selectedItem: string,
    updateCityItem: (value: string, valueEng: string) => void
}

const OpenSelect = ({isOpen, cities, selectedItem, updateCityItem}: IOpenSelect) => {
    return (
        <>
            {isOpen && (
                <div className="select__container">
                    {cities
                        .filter(({value}: City) =>
                            value.indexOf(`${selectedItem.charAt(0).toUpperCase()}${selectedItem.slice(1)}`) > -1)
                        .map((city: any) => {
                            return (
                                <div
                                    onClick={() => updateCityItem(city.value, city.valueEng)}
                                    key={city.valueEng}
                                    className='select__item'
                                >
                                    <span>{city.value}</span>
                                </div>
                            );
                        })}
                </div>
            )}
        </>
    )
}

export default OpenSelect