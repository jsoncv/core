import { cwd } from 'process'
import axios from 'axios'
import fs from 'fs'
const requireg = require('requireg')

// Checking to see if a string is a valid URL
const isUrlRegex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi);
const isUrl = (location:string) => location.match(isUrlRegex)

// Checking if a location path is absolute or not
const isLocationAbsolute = (location:string):boolean => location.startsWith('/')

// Loading files from URL's or Local Location
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

// Checking availability of the globally installed theme by name
const checkIfThemeIsGloballyAvailable = (name:string):boolean => {
    return requireg.resolve(name) !== undefined
}

// Getting the location of the globally installed theme by name
const getGlobalThemeLocation = (name:string):string => {
    const location = requireg.resolve(name).toString().trim()
    return location.substring(0, location.indexOf("/index.js"))
}

// Dynamically loading the theme as a module
const loadTemplateModule = async (templateLocation:string) => {
    const absoluteLocation = isLocationAbsolute(templateLocation) ? `${templateLocation}/index.js` : `${cwd()}/${templateLocation}/index.js`
    return import(absoluteLocation)
}

export {
    isLocationAbsolute,
    isUrl,
    loadFile,
    checkIfThemeIsGloballyAvailable,
    getGlobalThemeLocation,
    loadTemplateModule
}
