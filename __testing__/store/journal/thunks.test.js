/* eslint-disable */

import { collection, deleteDoc, getDocs } from "firebase/firestore/lite"
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice"
import { startNewNote } from "../../../src/store/journal/thunks"
import { FirebaseDB } from "../../../src/firebase/config"

jest.mock('')

describe('Pruebas en el Journal thunks', () => { 

    const dispatch = jest.fn()
    const getState = jest.fn()

    beforeEach( () => jest.clearAllMocks())

    test('Debe de crear una nueva nota vacia', async() => { 

        const uid = 'uid-TEST'
        getState.mockReturnValue({ auth: { uid }})

        await startNewNote() (dispatch, getState)

        expect( dispatch).toHaveBeenCalledWith(savingNewNote())

        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({
            title: '',
            body: '',
            id: expect.any( String ),
            date: expect.any( Number ),
            imageURL: []
        }));
        expect( dispatch ).toHaveBeenCalledWith( setActiveNote({
            title: '',
            body: '',
            id: expect.any( String ),
            date: expect.any( Number ),
            imageURL: []
        }))
        //Borrar notas de Firebase
        const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes`)
        const docs = await getDocs(collectionRef)

        const deletePromises = []
        docs.forEach( doc => deletePromises.push(deleteDoc(doc.ref)))

        await Promise.all( deletePromises)
    })
}) 