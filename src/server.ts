import {
    loadFile,
    checkIfThemeIsGloballyAvailable,
    loadTemplateModule,
    getGlobalThemeLocation
} from './utils'
import http, { IncomingMessage, RequestListener, ServerResponse } from 'http'

const server = {
    // Serving the CV as a webserver
    serve: (template:string, cvLocation:string, port:number=2314):void => {
        // Check to see if the template is name of a globally installed package
        if (checkIfThemeIsGloballyAvailable(template)) {
            template = getGlobalThemeLocation(template)
        }
        loadTemplateModule(template)
            .then(templateModule => { // If template is valid
                console.log(`Running on http://localhost:${port}`)
                // Creating the listener
                const listener:RequestListener = async (req:IncomingMessage, res:ServerResponse) => {
                    const cv = await loadFile(cvLocation)
                    // Adding the header to response
                    res.writeHead(200, { 'content-type': 'text/html' })
                    // Adding the rendered CV's HTML
                    res.write(templateModule.render(cv))
                    // Ending the response
                    res.end()
                }
                // Creating the server and starting to listen for incoming request
                const server = http.createServer(listener)
                server.listen(port)
            })
            .catch(err => { // If template is not valid
                if (err.code === 'MODULE_NOT_FOUND') {
                    console.log('The template is not valid!')
                } else {
                    // Covering other possible errors
                    console.log(err)
                }
            })
    }
}

export default server
