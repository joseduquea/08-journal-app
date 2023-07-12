import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../src/helpers/fileUpload"

cloudinary.config({
    cloud_name: '',
    api_key: '',
    api_secret: '',
    secure: true
})

describe('Prueba en el archivo fileUpload', () => { 

    /*test('Debe subir el archivo correctamente a Cloudinary', async() => { 

        const imageURL = 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=200'
        const resp = await fetch (imageURL)
        const blob = await resp.blob()
        const file = new File([blob], 'foto.jpg')

        const url = await fileUpload(file)
        expect(typeof url).toBe('string')

        //console.log(url) //yarn add -D setimmediate
        const segments = url.split('/')
        const imageId = segments[ segments.length - 1].replace('.jpeg','')
        const folder = ""
        await cloudinary.api.delete_resources(`${folder}/${imageId}`), () => {
            //done
        }
    });*/

    test('Debe de retornar un error', async() => { 

        const file = new File([], 'foto.jpg')

        const url = await fileUpload(file)
        expect(url).toBe(null)

    })
}) 