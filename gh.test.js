let page;

beforeEach(async () => {
    page = await browser.newPage();
});

afterEach(() => {
    page.close();
});

describe("Github page tests", () => {
    beforeEach(async () => {
        await page.goto("https://github.com/team");
    });

    test("The h1 header content'", async () => {
        const firstLink = await page.$("header div div a");
        await firstLink.click();
        await page.waitForSelector("h1");
        const title2 = await page.title();
        expect(title2).toEqual(
            "GitHub · Build and ship software on a single, collaborative platform · GitHub"
        );
    }, 7000);

    test("The first link attribute", async () => {
        const actual = await page.$eval("a", link => link.getAttribute("href"));
        expect(actual).toEqual("#start-of-content");
    }, 1000);

    test("The page contains Sign in button", async () => {
        const btnSelector = ".btn-large-mktg.btn-mktg";
        await page.waitForSelector(btnSelector, {
            visible: true
        });
        const actual = await page.$eval(btnSelector, link => link.textContent);
        expect(actual).toContain("Get started with Team");
    }, 500);
});
