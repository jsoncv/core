import { isLocationAbsolute, loadFile } from './utils'
import { cwd } from 'process'
import http, { IncomingMessage, RequestListener, ServerResponse } from 'http'
const requireg = require('requireg')

const checkIfThemeIsGloballyAvailable = (name:string):boolean => {
    return requireg.resolve(name) !== undefined
}

const getGlobalThemeLocation = (name:string):string => {
    const location = requireg.resolve(name).toString().trim()
    return location.substring(0, location.indexOf("/index.js"))
}

const loadTemplateModule = async (templateLocation:string) => {
    const absoluteLocation = isLocationAbsolute(templateLocation) ? `${templateLocation}/index.js` : `${cwd()}/${templateLocation}/index.js`
    return import(absoluteLocation)
}

const server = {
    serve: (template:string, cvLocation:string, port:number=2314):void => {
        if (checkIfThemeIsGloballyAvailable(template)) {
            template = getGlobalThemeLocation(template)
        }
        loadTemplateModule(template)
            .then(templateModule => {
                console.log(`Running on http://localhost:${port}`)
                const listener:RequestListener = async (req:IncomingMessage, res:ServerResponse) => {
                    const cv = await loadFile(cvLocation)
                    res.writeHead(200, { 'content-type': 'text/html' })
                    res.write(templateModule.render(cv))
                    res.end()
                }
                const server = http.createServer(listener)
                server.listen(port)
            })
            .catch(err => {
                if (err.code === 'MODULE_NOT_FOUND') {
                    console.log('The template is not valid!')
                } else {
                    console.log(err)
                }
            })
    }
}

export default server
