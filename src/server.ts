import { isLocationAbsolute, loadCvFile } from './utils'
import { cwd } from 'process'
import http, { IncomingMessage, RequestListener, ServerResponse } from 'http'

const loadTemplateModule = async (templateLocation:string) => {
    const absoluteLocation = isLocationAbsolute(templateLocation) ? `${templateLocation}/index.js` : `${cwd()}/${templateLocation}/index.js`
    return import(absoluteLocation)
}

const server = {
    serve: (templateLocation:string, cvLocation:string, port:number=2314):void => {
        loadTemplateModule(templateLocation)
            .then(templateModule => {
                console.log(`Running on http://localhost:${port}`)
                const listener:RequestListener = (req:IncomingMessage, res:ServerResponse) => {
                    const cv = loadCvFile(cvLocation)
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
