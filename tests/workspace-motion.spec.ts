import { expect, test, type Page } from "@playwright/test";

async function openCase(page: Page, slug = "officener-app") {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".capability-runway")).toHaveAttribute(
    "data-scroll-scene",
    "true",
  );
  const trigger = page.locator(`#work a[href="/work/${slug}"]`);
  await trigger.evaluate((element) =>
    element.scrollIntoView({ block: "center", behavior: "instant" }),
  );
  return trigger;
}

test("일반 모션으로 상세를 열어도 본문 글자 비율과 선택한 카드 위치가 유지됨", async ({
  page,
}) => {
  const runtimeErrors: string[] = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  const trigger = await openCase(page);
  await page.evaluate(() => {
    const observed = window as Window & {
      transitionStartTop?: number;
      transitionFrames?: { top: number; scaleX: number; scaleY: number }[];
    };
    observed.transitionFrames = [];
    let count = 0;
    const sample = () => {
      const main = document.querySelector(".workspace-main")!;
      const anchor = document
        .querySelector('#work a[href="/work/officener-app"]')!
        .closest(".work-item")!;
      const matrix = new DOMMatrixReadOnly(getComputedStyle(main).transform);
      observed.transitionFrames!.push({
        top: anchor.getBoundingClientRect().top,
        scaleX: matrix.m11,
        scaleY: matrix.m22,
      });
      if (++count < 90) requestAnimationFrame(sample);
    };
    window.addEventListener(
      "pointerdown",
      () => {
        observed.transitionStartTop = document
          .querySelector('#work a[href="/work/officener-app"]')!
          .closest(".work-item")!
          .getBoundingClientRect().top;
        requestAnimationFrame(sample);
      },
      { capture: true, once: true },
    );
  });
  await trigger.click();
  await expect(page.getByRole("region", { name: "사례 상세" })).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (window as Window & { transitionFrames?: unknown[] }).transitionFrames
            ?.length ?? 0,
      ),
    )
    .toBe(90);
  const { before, frames } = await page.evaluate(() => {
    const observed = window as Window & {
      transitionStartTop?: number;
      transitionFrames?: { top: number; scaleX: number; scaleY: number }[];
    };
    return {
      before: observed.transitionStartTop!,
      frames: observed.transitionFrames ?? [],
    };
  });
  expect(
    Math.max(...frames.map((frame) => Math.abs(frame.scaleX - 1))),
  ).toBeLessThan(0.01);
  expect(
    Math.max(...frames.map((frame) => Math.abs(frame.scaleY - 1))),
  ).toBeLessThan(0.01);
  expect(
    Math.max(...frames.map((frame) => Math.abs(frame.top - before))),
  ).toBeLessThan(12);
  const mainWidth = await page
    .locator(".workspace-main")
    .evaluate((el) => el.clientWidth);
  expect(mainWidth).toBeGreaterThan(1440 * 0.64);
  expect(runtimeErrors).toEqual([]);
});

test("일반 모션으로 상세를 닫고 헤더 목적지로 이동하면 실제 섹션에 도착함", async ({
  page,
}) => {
  for (const [name, id] of [
    ["소개", "about"],
    ["경력", "career"],
    ["연락", "contact"],
  ]) {
    const trigger = await openCase(page);
    await trigger.click();
    await expect(page.getByRole("region", { name: "사례 상세" })).toBeVisible();
    await page
      .getByRole("navigation", { name: "주 내비게이션", exact: true })
      .getByRole("link", { name, exact: true })
      .click();
    await expect(page.getByRole("region", { name: "사례 상세" })).toHaveCount(
      0,
    );
    await expect
      .poll(() =>
        page.locator(`#${id}`).evaluate((element) => {
          const inset =
            parseFloat(
              getComputedStyle(document.documentElement).scrollPaddingTop,
            ) || 0;
          const target = Math.max(
            0,
            Math.min(
              element.getBoundingClientRect().top + scrollY - inset,
              document.documentElement.scrollHeight - innerHeight,
            ),
          );
          return Math.abs(scrollY - target);
        }),
      )
      .toBeLessThan(2);
  }
});

test("스크롤 장면 초기화 뒤에도 작업 주소의 직접 진입 위치를 유지함", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/#work");
  await expect(page.locator(".capability-runway")).toHaveAttribute(
    "data-scroll-scene",
    "true",
  );
  await expect
    .poll(() =>
      page
        .locator("#work")
        .evaluate((el) =>
          Math.abs(
            el.getBoundingClientRect().top -
              (parseFloat(
                getComputedStyle(document.documentElement).scrollPaddingTop,
              ) || 0),
          ),
        ),
    )
    .toBeLessThan(2);
});

test("상세를 읽다가 모바일 폭으로 전환해도 상세와 읽던 내용이 보임", async ({
  page,
}) => {
  const trigger = await openCase(page, "officener-web");
  await trigger.click();
  const detail = page.getByRole("region", { name: "사례 상세" });
  await expect(detail).toBeVisible();
  await detail.evaluate((el) => {
    el.scrollTop = 800;
  });
  await expect(detail).toHaveJSProperty("scrollTop", 800);
  await page.setViewportSize({ width: 980, height: 1000 });
  await expect
    .poll(() => detail.evaluate((el) => el.getBoundingClientRect().top))
    .toBeLessThan(104);
  await expect(detail).toBeInViewport();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect
    .poll(() => detail.evaluate((el) => el.scrollTop))
    .toBeGreaterThan(500);
});
