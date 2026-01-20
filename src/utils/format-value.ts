//"1000" -> "1 000"
export function formatValue(value: string) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}