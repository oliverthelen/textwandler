export const INITIAL_EDITOR_CONTENT = `// Welcome to this crude JavaScript text editor! This editor empowers you to transform text using short, user-editable
// JavaScript functions. For the times you just need to quickly transform a text with a familiar setup :)

// Usage examples:

//// Use lodash
//setValue((input) => \`\${ input } -> \${ _.random(0, 100) }\`)

//// Filter all lines via a callback  
// filterLine((lineContent, lineNumber) => lineNumber % 2 === 0);

//// Transform all lines via a callback  
transformLine((lineContent, lineNumber) => lineContent + lineNumber);`;

export const INITIAL_INPUT_CONTENT = 'a\nb\nc';
