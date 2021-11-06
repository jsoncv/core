import {
    loadFile,
    checkIfThemeIsGloballyAvailable,
    loadTemplateModule,
    getGlobalThemeLocation
} from './utils'
import fs from 'fs'

const exportToHtml = (template:string, cvLocation:string, output:string) => {
    // Check to see if the template is name of a globally installed package
    if (checkIfThemeIsGloballyAvailable(template)) {
        template = getGlobalThemeLocation(template)
    }
    loadTemplateModule(template)
        .then(async (templateModule) => { // If template is valid
            // Compiling HTML
            const cv = await loadFile(cvLocation)
            const compiledHtml = templateModule.render(cv)
            // Writing to File
            fs.writeFileSync(output, compiledHtml)
            console.log(`\`${output}\` is ready!`)
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

export { exportToHtml }
