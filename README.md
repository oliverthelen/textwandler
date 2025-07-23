[![TextWandler Logo](./images/logo-text-1280.png)](https://oliverthelen.github.io/textwandler/)

A crude local editor for transforming text input via JavaScript code.
You give it some text input, define how to manipulate the input via chainable functions that can be utilized alongside your own javascript code.
In the end the result will be written to the output editor.

The editor is for desktop use and might not work the best on mobile.
Can be accessed online [here](https://oliverthelen.github.io/textwandler/).
The editor can be installed as a PWA for local usage.

[![TextWandler Logo](./images/screenshot.png)](https://oliverthelen.github.io/textwandler/)

You can toggle between viewing the input and output as simple text or in a diff view between the two.

[![TextWandler Logo](./images/screenshot_diff.png)](https://oliverthelen.github.io/textwandler/)

## Available functions

These are the integrated functions to interact with the input content and generate the final output.

### Actions Quick Reference

| Action                          | Description                                          |
| ------------------------------- | ---------------------------------------------------- |
| [append](#append)               | Adds a suffix to the end of each line                |
| [filterLine](#filterline)       | Keeps only lines that match a condition              |
| [grep](#grep)                   | Filters lines matching a pattern (like Unix grep)    |
| [join](#join)                   | Joins all lines with a specified separator           |
| [jsonParse](#jsonparse)         | Parses and manipulates JSON data                     |
| [prepend](#prepend)             | Adds a prefix to the beginning of each line          |
| [reduce](#reduce)               | Reduces all lines to a single output value           |
| [replace](#replace)             | Replaces text using string or regex patterns         |
| [reverse](#reverse)             | Reverses the order of all lines                      |
| [setValue](#setvalue)           | Sets the entire output to a custom value             |
| [slice](#slice)                 | Takes a subset of lines from the input               |
| [sort](#sort)                   | Sorts lines alphabetically or with custom comparator |
| [split](#split)                 | Splits each line into multiple lines                 |
| [transformLine](#transformline) | Transforms each line using a callback function       |
| [trim](#trim)                   | Removes whitespace from lines                        |
| [unique](#unique)               | Removes duplicate lines                              |

### append

Adds a suffix to the end of each line. Useful for adding file extensions, punctuation, or completion markers.

```js
function append(suffix: string): void
```

```js
// Add checkmark to completed tasks
append(' ✓');

// Add semicolons to statements
append(';');

// Add file extensions
append('.txt');

// Add closing tags
append('</li>');
```

### filterLine

Iterates over every line of the input and only keeps those lines for which the callback returns true.

```js
function filterLine(callback: (lineContent: string, lineNumber: number) => boolean): void
```

```js
// Keeps every second line from the input
filterLine((lineContent, lineNumber) => lineNumber % 2 === 0);
```

### grep

Filters lines matching a pattern, similar to the Unix grep command. Supports both string and regex patterns.

```js
function grep(pattern: string | RegExp, invert?: boolean): void
```

```js
// Keep lines containing 'error'
grep('error');

// Keep lines starting with numbers
grep(/^\d+/);

// Keep lines that do NOT contain 'debug' (inverted match)
grep('debug', true);

// Case-insensitive search
grep(/error/i);
```

### join

Joins all lines with a specified separator. Useful for converting multi-line text to single line or custom formats.

```js
function join(separator?: string): void
```

```js
// Join lines with comma and space
join(', ');

// Join lines with pipe separator
join(' | ');

// Join lines with just space
join(' ');

// Default behavior (keeps newlines)
join();
```

### jsonParse

Parses the input as a json object or array and allows the manipulation in the callback.
Result of the callback must be a json object or array again.

```js
function jsonParse((input: object | array) => object | array): void
```

```js
// Assumes as input an object like: {"a": 123}
jsonParse((json) => {
    json.a++;
    return json;
});
// Output will be:
// {
//    "a": 124
// }
```

### prepend

Adds a prefix to the beginning of each line. Useful for creating quotes, todos, or formatted lists.

```js
function prepend(prefix: string): void
```

```js
// Add quote prefix
prepend('> ');

// Add TODO prefix
prepend('TODO: ');

// Add checkbox prefix
prepend('- [ ] ');

// Add line numbers (static)
prepend('001: ');
```

### reduce

Iterates over every line and gives it to the provided callback. In the end the result of the last callback execution is stringified and written to the output.

```js
function reduce(
    callback: (
        result: any,
        currentLine: string,
        currentLineNumber: number,
        inputLinesArray: string[]
    ) => any,
    initialValue?: any
): void
```

```js
// Parses every line from the input as a number and calculates the sum as the output
reduce((result, line) => {
    if (parseInt(line)) {
        result += parseInt(line);
    }
    return result;
}, 0);
```

### replace

Replaces text across all lines using string or regex patterns. Supports flags for advanced string matching.

```js
function replace(searchValue: string | RegExp, replaceValue: string, flags?: string): void
```

```js
// Simple string replacement
replace('old', 'new');

// Regex replacement
replace(/\d+/g, 'NUMBER');

// Case-insensitive replacement
replace('hello', 'hi', 'gi');

// Replace multiple patterns
replace(/\s+/g, '_'); // Replace whitespace with underscores
```

### reverse

Reverses the order of all lines. The last line becomes the first, and so on.

```js
function reverse(): void
```

```js
// Reverse the order of lines
reverse();
```

### setValue

Allows to set the whole output to the result of the callback which gets the results of the previous function chain as the input.

```js
function setValue((input: string) => string): void
```

```js
setValue(() => 'set the output to this string\nnext line');
```

### slice

Takes a subset of lines from the input, similar to Array.slice(). Supports negative indices.

```js
function slice(start: number, end?: number): void
```

```js
// Take lines 1-3 (indices 1 and 2)
slice(1, 3);

// Take from line 2 to the end
slice(2);

// Take the last 3 lines
slice(-3);
```

### sort

Sorts all lines using an optional comparator function. If no comparator is provided, lines are sorted alphabetically.

```js
function sort(callback?: (a: string, b: string) => number): void
```

```js
// Sort lines alphabetically (default behavior)
sort();

// Sort lines in reverse alphabetical order
sort((a, b) => b.localeCompare(a));

// Sort lines numerically
sort((a, b) => parseInt(a) - parseInt(b));

// Sort lines by length
sort((a, b) => a.length - b.length);
```

### split

Splits each line into multiple lines using a separator. Useful for processing CSV, pipe-delimited, or space-separated data.

```js
function split(separator: string | RegExp): void
```

```js
// Split CSV lines
split(',');

// Split on any whitespace
split(/\s+/);

// Split pipe-delimited data
split(' | ');

// Split on semicolon
split(';');
```

### transformLine

Iterates over every line of the input and puts the result of the callback into the output in its place.

```js
function transformLine(callback: (lineContent: string, lineNumber: number) => string): void
```

```js
// Prefixes every line with the lineNumber
transformLine((lineContent, lineNumber) => `${lineNumber} ${lineContent}`);
```

### trim

Removes whitespace from the beginning and/or end of each line. Includes convenience methods for specific trimming.

```js
function trim(mode?: 'both' | 'start' | 'end'): void
function trimStart(): void
function trimEnd(): void
```

```js
// Remove whitespace from both sides (default)
trim();
trim('both');

// Remove whitespace from start only
trim('start');
trimStart();

// Remove whitespace from end only
trim('end');
trimEnd();
```

### unique

Filters all lines and leaves only unique ones as a result for the next stage

```js
function unique(): void
```

```js
unique();
```

## Chaining of functions

The result of the last function that is executed in the code editor will be written to the output.
Only the first function that is executed reads the original input every subsequent functions reads the input from the previous function.

As an example look at the following input for the code editor and see how it transforms the text input.

```js
// Strip the prefix off
transformLine((lineContent, lineNumber) => lineContent.substring(7));
// Only keep the lines that contain uneven numbers
filterLine((lineContent, lineNumber) => parseInt(lineContent) % 2 != 0);
// Transform the input into a comma separated list
reduce((result, currentLine, currentLineNumber) => {
    if (currentLineNumber === 0) return currentLine;
    return `${result},${currentLine}`;
}, '');
```

Initial input

```
prefix 1
prefix 2
prefix 3
```

After executing the `transformLine`

```
1
2
3
```

After executing the `filterLine`

```
1
3
```

After executing the `reduce`

```
1,3
```

## Additional imports

### lodash

It is possible to use lodash functions in your code as the full lodash is available.

```js
transformLine((lineContent) => _.snakeCase(lineContent));
```
