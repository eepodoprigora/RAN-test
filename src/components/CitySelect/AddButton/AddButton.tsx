interface IAddBtnProps {
    addSelectedItem: (value: string) => void,
    selectedItemEng: string,
    loading: boolean

}

const AddButton = ({addSelectedItem, selectedItemEng, loading}: IAddBtnProps) => {
    return (
        <button className='select__add-btn' onClick={() => addSelectedItem(selectedItemEng)}>
            {loading ?
                <img className='select__loader' src={require('../../../images/loading.gif')} alt={'#'}/>
                :
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px"
                     height="48px" fillRule="evenodd">
                    <path fillRule="evenodd"
                          d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"/>
                </svg>
            }

        </button>
    )
}
export default AddButton