interface IErrorsProps {
    error: boolean,
    addedTownError: boolean
}

const Errors = ({error, addedTownError}: IErrorsProps) => {
    return (
        <>
            {error &&
                <div className='select__error'>Может все-таки введем город?</div>}
            {addedTownError &&
                <div className='select__error'>Город уже добавлен. Проверьте фильтр температуры!</div>}
        </>)
}

export default Errors