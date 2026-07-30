

/**
 *Genearte Random Alpha Numeric string
 * @param length Length of the random alpha numeric string needs to be generated
 * @returns 
 */
export function randomGenerateAlphanumeric(length: 10): string {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    for(let i = 0; i< length; i++) 
        text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
}

/**
 * Generate Random Numeric string.
 * @param length Length of the random numeric string needs to be generated 
 */
export function randomGenerateNumeric(length: 10): string {
    let text = "";
    const possible = "0123456789";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    if (text.startsWith("0")) {
        text = randomGenerateNumeric(length);
    }
    return text;
}