import { render } from "@testing-library/react"
import { LoginPage } from "../../../src/auth/pages/LoginPage"
import { Provider } from "react-redux"

describe('Pruebas en LoginPage', () => { 

    test('Debe de mostrar el componente correctamente', () => { 
        
        render(
            <Provider store={ store }>
                <LoginPage/>
            </Provider>
        )
    })
})