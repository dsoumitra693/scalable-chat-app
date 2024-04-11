export const formatText = (str: string, maxLength: number) => {
    if (str === null || str === undefined) {
        return '';
    }
    
    if (maxLength <= 0) {
        return str;
    }

    let len = str.length

    str = `${str.slice(0, maxLength + 1)}${len > maxLength ? '...' : ''}`
    
    return str
}