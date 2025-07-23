import { test, expect, PlaywrightTestArgs } from '@playwright/test';

async function testEditorContent(
    page: PlaywrightTestArgs['page'],
    code: string,
    input: string,
    output: string
) {
    await page.goto('/');

    await expect(page.locator("[id='button-run']")).toBeVisible();

    // Input Function Code Editor
    const codeEditor = page.getByRole('code').nth(0);
    await codeEditor.click();
    await page.keyboard.press('ControlOrMeta+KeyA');
    await page.keyboard.type(code);

    // Input Left Code Editor
    const inputEditor = page.getByRole('code').nth(1);
    await inputEditor.click();
    await page.keyboard.press('ControlOrMeta+KeyA');
    await page.keyboard.type(input);

    // Run Code
    await page.click("[id='button-run']");

    // Wait for function to execute
    await page.waitForTimeout(150);

    // Check Result
    const errorOutput = await page.textContent("[id='error-output-content']");
    expect(errorOutput).toEqual('');

    const inputTextFromEditor = (
        await page.getByRole('code').nth(1).textContent()
    )?.replace(/\s+/g, '');
    const outputTextFromEditor = (
        await page.getByRole('code').nth(2).textContent()
    )?.replace(/\s+/g, '');
    const inputTextTrimmed = input.replace(/\r?\n/g, '');
    const outPutTextTrimmed = output.replace(/\r?\n/g, '');

    expect(inputTextFromEditor).toContain(inputTextTrimmed);
    expect(inputTextFromEditor.endsWith(inputTextTrimmed)).toBeTruthy();
    expect(outputTextFromEditor).toContain(outPutTextTrimmed);
    expect(outputTextFromEditor.endsWith(outPutTextTrimmed)).toBeTruthy();
}

test('Action: transformLine', async ({ page }) => {
    await testEditorContent(
        page,
        `transformLine((lineContent, lineNumber) => lineContent + '_' + lineNumber);`,
        `x\ny\nz`,
        `x_0\ny_1\nz_2`
    );
});

test('Action: filterLine', async ({ page }) => {
    await testEditorContent(
        page,
        `filterLine((lineContent, lineNumber) => lineNumber % 2 !== 0);`,
        `x\ny\nz`,
        `y`
    );
});

test('Action: reduce', async ({ page }) => {
    await testEditorContent(
        page,
        `reduce((result, line) => { if(parseInt(line)) { result += parseInt(line) } return result; }, 0);`,
        `x\n1\n2\ny\n10\nz`,
        `13`
    );
});

test('Action: setValue', async ({ page }) => {
    await testEditorContent(
        page,
        'setValue(() => "ACE");',
        `x\ny\nz`,
        `A\nC\nE`
    );
});

test('Action: unique', async ({ page }) => {
    await testEditorContent(
        page,
        `unique();`,
        `x\nx\nz\n111\n222\n111`,
        `x\nz\n111\n222`
    );
});

test('Action: sort - default alphabetical', async ({ page }) => {
    await testEditorContent(
        page,
        `sort();`,
        `zebra\napple\nbanana\ncherry`,
        `apple\nbanana\ncherry\nzebra`
    );
});

test('Action: sort - with comparator function', async ({ page }) => {
    await testEditorContent(
        page,
        `sort((a, b) => b.localeCompare(a));`,
        `zebra\napple\nbanana\ncherry`,
        `zebra\ncherry\nbanana\napple`
    );
});

test('Action: sort - numeric sorting', async ({ page }) => {
    await testEditorContent(
        page,
        `sort((a, b) => parseInt(a) - parseInt(b));`,
        `100\n2\n30\n1`,
        `1\n2\n30\n100`
    );
});

test('Action: append - checkmark suffix', async ({ page }) => {
    await testEditorContent(
        page,
        `append('✓');`,
        `statement_one\nstatement_two\nstatement_three`,
        `statement_one✓\nstatement_two✓\nstatement_three✓`
    );
});

test('Action: append - semicolon suffix', async ({ page }) => {
    await testEditorContent(
        page,
        `append(';');`,
        `statement_one\nstatement_two\nstatement_three`,
        `statement_one;\nstatement_two;\nstatement_three;`
    );
});

test('Action: append - file extension', async ({ page }) => {
    await testEditorContent(
        page,
        `append('.txt');`,
        `file1\nfile2\nfile3`,
        `file1.txt\nfile2.txt\nfile3.txt`
    );
});

test('Action: grep - string pattern', async ({ page }) => {
    await testEditorContent(
        page,
        `grep('error');`,
        `info:starting\nerror:failed\nwarn:issue\nerror:timeout`,
        `error:failed\nerror:timeout`
    );
});

test('Action: grep - regex pattern', async ({ page }) => {
    await testEditorContent(
        page,
        `grep(/\\d+$/);`,
        `lineendingwith123\ntextline\nanotherlinewith456\nmoretext`,
        `lineendingwith123\nanotherlinewith456`
    );
});

test('Action: grep - with invert flag', async ({ page }) => {
    await testEditorContent(
        page,
        `grep('error', true);`,
        `info:starting\nerror:failed\nwarn:issue\nerror:timeout`,
        `info:starting\nwarn:issue`
    );
});

test('Action: split - comma separator', async ({ page }) => {
    await testEditorContent(
        page,
        `split(',');`,
        `apple,banana,cherry\ngrape,kiwi,mango`,
        `apple\nbanana\ncherry\ngrape\nkiwi\nmango`
    );
});

test('Action: split - pipe separator', async ({ page }) => {
    await testEditorContent(
        page,
        `split('|');`,
        `first|second|third\nfourth|fifth`,
        `first\nsecond\nthird\nfourth\nfifth`
    );
});

test.skip('Action: trim - both sides', async ({ page }) => {
    await testEditorContent(
        page,
        `trim();`,
        `  line1  \n\t\tline2\t\t\n   line3   `,
        `line1\nline2\nline3`
    );
});

test.skip('Action: trimStart - left side only', async ({ page }) => {
    await testEditorContent(
        page,
        `trimStart();`,
        `  line1  \n\t\tline2\t\t\n   line3   `,
        `line1  \nline2\t\t\nline3   `
    );
});

test.skip('Action: trimEnd - right side only', async ({ page }) => {
    await testEditorContent(
        page,
        `trimEnd();`,
        `  line1  \n\t\tline2\t\t\n   line3   `,
        `  line1\n\t\tline2\n   line3`
    );
});

test('Action: reverse', async ({ page }) => {
    await testEditorContent(
        page,
        `reverse();`,
        `first\nsecond\nthird\nfourth`,
        `fourth\nthird\nsecond\nfirst`
    );
});
