export default function useWordCounter(inputString: string) {
    // Remove leading and trailing whitespaces
    const trimmedString = inputString.trim();

    // Use a regular expression to split the string by spaces, tabs, and newlines
    const words = trimmedString.split(/\s+/);

    // Return the number of elements in the resulting array
    return words.length;
}