export const formateText = (str:string, maxLength:number) => {
    let len = str.length

    str = str.slice(0, maxLength + 1).concat(len > maxLength ? '...': '')
    
    return str
}