import Ajv from 'ajv'
import { loadFile } from './utils'

// Using AJV to validate JSON Schema
const ajv = new Ajv()
const validate = (schema:object) => ajv.compile(schema)

const validator = async (cvLocation:string) => {
    // Loading the CV and its Schema from the provided location
    const cv = await loadFile(cvLocation)
    const schemaLocation = cv.$schema
    const schema = await loadFile(schemaLocation)

    // Validating the CV
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
