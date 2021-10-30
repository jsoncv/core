import { cwd } from 'process'
import axios from 'axios'
import fs from 'fs'

const isUrlRegex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi);

const isLocationAbsolute = (location:string):boolean => location.startsWith('/')

const isUrl = (location:string) => location.match(isUrlRegex)

const loadCvFile = (location:string) => {
    const absoluteLocation = isLocationAbsolute(location) ? location : `${cwd()}/${location}`
    return require(absoluteLocation)
}

const loadSchema = (location:string):Object => {
    return new Promise(resolve => {
        if (isUrl(location)) {
            axios.get(location).then((response) => {
                resolve(response.data)
            }).catch(error => {
                throw(error)
            })
        } else {
            fs.readFile(location, 'utf-8', (err, data) => {
                resolve(JSON.parse(data))
            })
        }
    })
}

export {
    isLocationAbsolute,
    isUrl,
    loadCvFile,
    loadSchema
}
