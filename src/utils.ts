import { cwd } from 'process'
import axios from 'axios'
import fs from 'fs'

const isUrlRegex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi);

const isUrl = (location:string) => location.match(isUrlRegex)

const isLocationAbsolute = (location:string):boolean => location.startsWith('/')

// FIXME: Return any is not good
const loadFile = (location:string):any => {
    return new Promise((resolve, reject) => {
        if (isUrl(location)) {
            axios.get(location).then((response) => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
        } else {
            const absoluteLocation = isLocationAbsolute(location) ? location : `${cwd()}/${location}`
            fs.readFile(absoluteLocation, 'utf-8', (err, data) => {
                resolve(JSON.parse(data))
            })
        }
    })
}

export {
    isLocationAbsolute,
    isUrl,
    loadFile
}
