import { expect, test } from "@playwright/test";

for (const width of [1024, 1100, 1279]) {
  test(`${width}px에서 상세가 오른쪽에 열리고 본문을 가리지 않음`, async ({
    page,
  }, testInfo) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/#work");
    const trigger = page.locator('#work a[href="/work/officener-web"]');
    await trigger.click();
    const main = page.locator(".workspace-main");
    const detail = page.getByRole("region", { name: "사례 상세" });
    await expect(detail).toBeInViewport();
    await expect
      .poll(async () => {
        const body = await main.boundingBox();
        const panel = await detail.boundingBox();
        return body && panel ? panel.x - body.x - body.width : -1;
      })
      .toBeGreaterThanOrEqual(16);
    const body = await main.boundingBox();
    const panel = await detail.boundingBox();
    expect(body!.width).toBeGreaterThanOrEqual(600);
    expect(panel!.width).toBeGreaterThanOrEqual(340);
    expect(panel!.x + panel!.width).toBeLessThanOrEqual(width);
    await expect(trigger).toBeInViewport();
    await expect(
      detail.locator("#inline-case-title-officener-web"),
    ).toBeInViewport();
    const documentY = await page.evaluate(() => window.scrollY);
    await detail.evaluate((element) => {
      element.scrollTop = 600;
    });
    await expect(detail).toHaveJSProperty("scrollTop", 600);
    expect(await page.evaluate(() => window.scrollY)).toBe(documentY);
    const overflow = await page.evaluate(() => {
      const root = document.documentElement;
      return root.scrollWidth - root.clientWidth;
    });
    expect(overflow).toBeLessThanOrEqual(1);
    const detailOverflow = await detail.evaluate(
      (element) => element.scrollWidth - element.clientWidth,
    );
    expect(detailOverflow).toBeLessThanOrEqual(1);
    await detail.evaluate((element) => {
      element.scrollTop = 0;
    });
    await page.screenshot({
      path: testInfo.outputPath(`${width}-side-detail.png`),
      animations: "disabled",
    });
    await page.keyboard.press("Escape");
    await expect(detail).toHaveCount(0);
    await expect(trigger).toBeFocused();
    await expect(trigger).toBeInViewport();
  });
}

test("1100px 경력 프로젝트 상세도 오른쪽에서 읽고 원래 목록으로 돌아옴", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1100, height: 900 });
  await page.goto("/#career");
  const trigger = page.locator('#career a[href="/work/flying-doctors"]');
  await trigger.click();
  const detail = page.getByRole("region", { name: "사례 상세" });
  await expect(
    detail.locator("#inline-case-title-flying-doctors"),
  ).toBeInViewport();
  const mainBounds = await page.locator(".workspace-main").boundingBox();
  const detailBounds = await detail.boundingBox();
  expect(detailBounds!.x).toBeGreaterThanOrEqual(
    mainBounds!.x + mainBounds!.width + 16,
  );
  await expect(trigger).toBeInViewport();
  await page.screenshot({
    path: testInfo.outputPath("1100-career-side-detail.png"),
    animations: "disabled",
  });
  await detail.getByRole("link", { name: "상세 닫기" }).click();
  await expect(detail).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await expect(trigger).toBeInViewport();
});

test("1024px 사이드 상세와 좁은 화면을 왕복해도 읽던 위치를 유지함", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto("/#work");
  await page.locator('#work a[href="/work/officener-web"]').click();
  const detail = page.getByRole("region", { name: "사례 상세" });
  await expect(
    detail.locator("#inline-case-title-officener-web"),
  ).toBeFocused();
  await detail.evaluate(
    (element) =>
      new Promise<void>((resolve) => {
        element.addEventListener("scroll", () => resolve(), { once: true });
        element.scrollTop = 600;
      }),
  );
  await expect(detail).toHaveJSProperty("scrollTop", 600);
  await page.setViewportSize({ width: 1023, height: 900 });
  await expect(detail).toBeInViewport();
  await expect
    .poll(() =>
      detail.evaluate((element) => -element.getBoundingClientRect().top),
    )
    .toBeGreaterThan(450);
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(detail).toHaveJSProperty("scrollTop", 600);
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(detail).toHaveJSProperty("scrollTop", 600);
});
