
export const initialState = {
    status: 'checking', //'checking' 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const authenticatedState = {
    status: 'authenticated', //'checking' 'not-authenticated', 'authenticated'
    uid: '1123ADC',
    email: 'jose@demo.com',
    displayName: 'Demo Jose',
    photoURL: 'https://josedemo.jpg',
    errorMessage: null,
}

export const notAuthenticatedState = {
    status: 'not-authenticated', //'checking' 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}
  
  export const demoUser = {
    uid: '1123ADC',
    email: 'jose@demo.com',
    displayName: 'Demo Jose',
    photoURL: 'https://josedemo.jpg',
}