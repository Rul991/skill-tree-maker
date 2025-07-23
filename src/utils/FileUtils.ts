import { FILE_WAIT_TIME } from './consts'

export default class FileUtils {
    static save(name: string, value: string): void {
        const link = document.createElement('a')
        link.download = name
        link.href = URL.createObjectURL(new Blob([value]))
        link.click()
    }

    static load(): Promise<string> {
        return new Promise((resolve, reject) => {
            const input = document.createElement('input')
            input.type = 'file'

            const timeout = setTimeout(() => {
                reject('time over')
            }, FILE_WAIT_TIME)

            input.addEventListener('change', (event: any) => {
                clearTimeout(timeout)
                const files: FileList | null = event.target.files
                
                if(!files || files!.length == 0) {
                    reject('files dont choosed')
                    return
                }

                files[0].text()
                .then(text => resolve(text))
            }, {once: true})

            input.click()
        })
    }
}