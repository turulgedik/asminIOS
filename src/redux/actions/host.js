export const BASE_URL = 'https://asminshopping.com/backend'
export const IMAGE_URL = 'https://asminshopping.com'
export const MAIN_URL = 'https://asminshopping.com/backend'
export const SOCKET_URL = 'https://213.128.89.18:3000'
export const MEDIA_URL = 'https://asminshopping.com/backend/media/'


export const tokenConfig = getState => {
    const token = getState().User.auth.token
    const csrf = getState().User.csrf
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken':csrf
        }
    }

    if (token) {
        config.headers['Authorization'] = `Token ${token}`
    }

    return config
}

export const getUserID = getState => {
    const id = getState().User.user.id

    return id
}