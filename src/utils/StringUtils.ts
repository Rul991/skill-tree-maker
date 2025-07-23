export default class StringUtils {
    private static _englishTranslit: string[] = [
        'a', 'b', 'v', 'g', 'd', 'e', 'yo', 'zh', 'z',
        'i', 'y', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's',
        't', 'u', 'f', 'h', 'c', 'ch', 'sh', 'sh\'', '\'',
        'i', '\'', 'e', 'yu', 'ya'
    ]

    private static _russianSymbols: string = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'

    static russianToEnglishTranslit(value: string): string {
        let result = ''

        for (let i = 0; i < value.length; i++) {
            const symb = value[i].toLowerCase()
            const isSymbLowerCase = value[i] == symb
            let isRussianSymbol = false

            for (let j = 0; j < this._russianSymbols.length; j++) {
                const russianSymb = this._russianSymbols[j]
                
                if(symb == russianSymb) {
                    let englishSymbol = this._englishTranslit[j]
                    if(!isSymbLowerCase) englishSymbol = englishSymbol.toUpperCase()

                    result = result.concat(englishSymbol)
                    isRussianSymbol = true
                    break
                }
            }

            if(!isRussianSymbol) result = result.concat(symb)
        }

        return result
    }
}