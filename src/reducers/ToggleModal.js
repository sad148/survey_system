const toggleModal = (state = { toggleRegisterModal:false}, action) => {
    switch (action.type) {
        case 'TOGGLE_REGISTER_MODAL':
            state= {
                ...state,
                toggleRegisterModal:action.payload,
            }
    }
    return state;
}

export default toggleModal;