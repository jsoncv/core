import fs from 'fs'
import Ajv from 'ajv'
import axios from 'axios'

const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi;
const regex = new RegExp(expression);
const ajv = new Ajv()

const _validate = (cv:object, schema:object):void => {
    const validate = ajv.compile(schema)
    const valid = validate(cv)
    if (!valid) console.log(validate.errors)
}

const validator = (cv:any):void => {
    const schemaLocation:string = cv.$schema
    if (schemaLocation.match(regex)) {
        axios.get(schemaLocation).then((response) => {
            const schema = response.data
            _validate(cv, schema)
        })
    } else {
        fs.readFile(schemaLocation, 'utf-8', (err, data) => {
            const schema = JSON.parse(data)
            _validate(cv, schema)
        })
    }
}

export default validator
