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

    test("The h1 header content", async () => {
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

describe("Github page tests Enterprise", () => {
    const subNavSelector = "[data-testid='SubNav-root-link']";

    beforeEach(async () => {
        await page.goto("https://github.com/enterprise");
    }, 10000);

    test("The title page Enterprise", async () => {
        await page.waitForSelector("h1");
        const titlePage = await page.title();
        expect(titlePage).toEqual(
            "The AI Powered Developer Platform. · GitHub"
        );
    }, 8000);

    test("The title page Enterprise Advanced Security", async () => {
        await page.waitForSelector("ul");
        const firstLink = await page.$$(subNavSelector);
        await firstLink[0].click();
        const btnSelector = "#hero-section-brand-heading";
        await page.waitForSelector(btnSelector, {
            visible: true
        });
        const actual = await page.$eval(btnSelector, link => link.textContent);
        expect(actual).toContain(
            "Security that moves at the  speed of development"
        );
    }, 5000);

    test("The title page Enterprise Premium Support", async () => {
        await page.waitForSelector("ul");
        const firstLink = await page.$$(subNavSelector);
        await firstLink[1].click();
        const btnSelector =
            ".mt-5.mt-lg-8.mb-8.h1-mktg.text-semibold.col-lg-12";
        await page.waitForSelector(btnSelector, {
            visible: true
        });
        const titlePage = await page.title();
        expect(titlePage).toEqual("GitHub Premium Support · GitHub");
    }, 5000);
});
