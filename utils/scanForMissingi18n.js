import fs from 'fs'
import { readdir } from 'node:fs/promises'
import { Parser } from 'i18next-scanner'

const __dirname = process.cwd()

const main = async () => {
    let parser = new Parser()

    const initialPath = __dirname.split('/')
    initialPath.push('src')
    const directoryPath = initialPath.join('/')
    console.log(`Scanning for tsx files in ${directoryPath}...`)

    const files = await readdir(directoryPath, { recursive: true, withFileTypes: true })
    const tsxFiles = files.filter((f) => {
        const nameSplit = f.name.split('.')
        return nameSplit[nameSplit.length - 1].toLowerCase() === 'tsx' && f.path.indexOf('__mocks__') < 0
    })
    const fileCount = tsxFiles.length
    console.log(`Found ${fileCount} files. Beginning processing...`)

    for (let i = 0; i < fileCount; i++) {
        console.log(`Processing file ${i + 1} of ${fileCount}: ${tsxFiles[i].path}/${tsxFiles[i].name}...`)

        let content = fs.readFileSync(`${tsxFiles[i].path}/${tsxFiles[i].name}`, 'utf-8')

        parser.parseFuncFromString(content, { list: ['t'] })
    }

    console.log(parser.get())
}

main()