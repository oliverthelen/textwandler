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

test('Action: prepend - quote prefix', async ({ page }) => {
    await testEditorContent(
        page,
        `prepend('> ');`,
        `first line\nsecond line\nthird line`,
        `> first line\n> second line\n> third line`
    );
});

test('Action: prepend - todo prefix', async ({ page }) => {
    await testEditorContent(
        page,
        `prepend('TODO: ');`,
        `fix bug\nwrite tests\nupdate docs`,
        `TODO: fix bug\nTODO: write tests\nTODO: update docs`
    );
});

test('Action: prepend - checkbox prefix', async ({ page }) => {
    await testEditorContent(
        page,
        `prepend('- [ ] ');`,
        `task one\ntask two\ntask three`,
        `- [ ] task one\n- [ ] task two\n- [ ] task three`
    );
});
