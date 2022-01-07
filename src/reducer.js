const reducer = (state, action) => {
    switch (action.type) {
        case "JOINED":
            return {
                ...state,
                joined: true,
                roomId: action.payload.roomId,
                username: action.payload.username,
            };
        case "SET_DATA":
            return {
                ...state,
                users: action.payload.users,
                messages: action.payload.messages,
            };
        case "SET_USERS":
            return {
                ...state,
                users: action.payload,
            };
        case "SET_MESSAGES":
            return {
                ...state,
                messages: action.payload,
            };
        case "NEW_MESSAGE":
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
        default:
            return state;
    }
};
export default reducer;

