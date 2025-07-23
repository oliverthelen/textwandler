export const INITIAL_EDITOR_CONTENT = `// 🪄 Welcome to TextWandler! Transform your text with JavaScript magic ✨
// 
// Chain powerful text transformation functions together to process your input.
// Try the examples below or create your own combinations!

// 🎯 Quick Examples - Uncomment any line to try:

// Add line numbers to each line
// transformLine((line, num) => \`\${num + 1}. \${line}\`);

// Convert to TODO list  
// prepend('- [ ] ');

// Create CSV from lines
// join(', ');

// Filter out empty lines
// grep(/\\S/);

// Sort alphabetically
// sort();

// Remove duplicates
// unique();

// Transform case and add prefix
// transformLine(line => \`LOG: \${line.toUpperCase()}\`);

// Complex chain example: clean data and format
/*
trim();                    // Remove whitespace
filterLine(line => line);  // Remove empty lines  
unique();                  // Remove duplicates
sort();                    // Sort alphabetically
prepend('• ');            // Add bullet points
*/

// 💡 Try editing the input text on the left, then run your transformation!
// 📚 Check the documentation for all available functions

transformLine((line, num) => \`\${num + 1}. \${line}\`);
`;

export const INITIAL_INPUT_CONTENT = `Write documentation
Fix bug in login
Update dependencies
Write documentation
Add unit tests
Add unit tests

Review pull request
Deploy to production
Fix bug in login
Update README`;
