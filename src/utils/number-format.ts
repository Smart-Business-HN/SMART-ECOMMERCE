export function FormatValues(value: number): string {
    const valueString = value.toFixed(2);
    const [wholePart, decimalPart] = valueString.split(".");
    let formattedValue = "L. ";

    if (wholePart.length > 3) {
        const colons = wholePart.length / 3;
        const digits = wholePart.split('');

        for (let i = 1; i < colons; i++) {
            const position = i === 1 ? wholePart.length - 3 : wholePart.length - (4 * i - 1);
            digits.splice(position, 0, ",");
        }

        formattedValue += digits.join('');
    } else {
        formattedValue += wholePart;
    }

    formattedValue += `.${decimalPart || "00"}`;

    return formattedValue;
};