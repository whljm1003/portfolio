import { expect, test } from "@playwright/test";

for (const progress of [0.3, 0.4]) {
  test(`역량 ${progress * 100}% 위치에서 관련 사례를 마우스로 눌러도 링크가 도망가지 않음`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    const runway = page.locator(".capability-runway");
    await expect(runway).toHaveAttribute("data-scroll-scene", "true");
    const top = await runway.evaluate(
      (element, value) =>
        element.getBoundingClientRect().top +
        scrollY +
        (element.getBoundingClientRect().height - innerHeight) * value,
      progress,
    );
    await page.evaluate(
      (value) => scrollTo({ top: value, behavior: "instant" }),
      top,
    );
    const link = runway.locator('a[href="/work/officener-app"]');
    await expect(link).toBeInViewport();
    await link.click({ delay: 120 });
    await expect(page).toHaveURL(/\/work\/officener-app$/);
    await expect(page.getByRole("region", { name: "사례 상세" })).toBeVisible();
  });
}
