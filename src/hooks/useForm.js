import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidations = {} ) => {
  
    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({})

    useEffect(() => {
      createValidations()
    }, [ formState ]) //CADA VEZ que haya un cambio en el formState se ejecutara el createValidations()

    //TODO: cuando el initialForm cambia y la nota activa cambie, se va disparar este Efecto 
    useEffect(() => {
        setFormState(initialForm) //si el initialForm cambia se vuelve a disparar esto
    }, [ initialForm ]) 
    
     
    //Memorizar el valor para no volver a procesar 
    const isFormValid = useMemo( () => {
        for (const formValue of Object.keys(formValidation)) { //De esta forma pasara por cada una de las propiedaes deñ formValidation
            if (formValidation[formValue] !== null) return false;   
            //evaluacion de si los valores del formValidations son distintos a null retorna false para salir del ciclo de evaluacion
            //osea si un campo del formulario no es valido, entonces el envio del mismo no sera validado 
        }
        return true;
    }, [ formValidation ])

    const onInputChange = ({target}) => {
        const {name, value} = target;
        setFormState({
            ...formState,
            [name]: value
        })
    }
    const onReset = () => {
        setFormState(initialForm);
    }

    //TODO: Validaciones 

    const createValidations = () => {
        const formCheckedValues = {};

        //Hay que leer y analizar cada una de las propiedades (name, email, password) por esto usare un For Of
        for (const formField of Object.keys(formValidations)) {
            const [ fn, errorMessage ] = formValidations[formField];

            formCheckedValues[`${ formField }Valid`] = fn( formState[formField]) ? null : errorMessage;
        }
        setFormValidation( formCheckedValues );
    }

    return{
        ...formState,
        formState,
        onInputChange,
        onReset,
        ...formValidation,
        isFormValid
    }
}
