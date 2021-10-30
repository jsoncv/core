import Ajv from 'ajv'
import { loadCvFile, loadSchema} from './utils'

const ajv = new Ajv()

const validate = (schema:object) => ajv.compile(schema)

const validator = async (cvLocation:string) => {
    const cv = loadCvFile(cvLocation)
    const schemaLocation = cv.$schema
    const schema = await loadSchema(schemaLocation)
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
