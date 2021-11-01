import Ajv from 'ajv'
import { loadFile } from './utils'

const ajv = new Ajv()

const validate = (schema:object) => ajv.compile(schema)

const validator = async (cvLocation:string) => {
    const cv = await loadFile(cvLocation)
    const schemaLocation = cv.$schema
    const schema = await loadFile(schemaLocation)
    return new Promise((resolve, reject) => {
        const ajvValidate = validate(schema)
        const valid = ajvValidate(cv)
        if (valid) {
            resolve(true)
        } else {
            reject(ajvValidate.errors)
        }
    })
}

export default validator
