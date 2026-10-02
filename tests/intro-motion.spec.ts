import { expect, test } from "@playwright/test";

type IntroFrame = {
  height: number;
  copyTop: number;
  titleY: number[];
};

for (const [width, height] of [
  [390, 844],
  [1440, 740],
  [1440, 900],
]) {
  test(`${width}×${height}px 인트로는 느린 초기화에도 높이와 제목 등장 방향을 유지함`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.addInitScript(() => {
      const observed = window as Window & {
        introMotionFrames?: IntroFrame[];
      };
      observed.introMotionFrames = [];
      function observe() {
        const hero = document.querySelector("#intro");
        const copy = hero?.querySelector(".hero-copy");
        const lines = hero?.querySelectorAll(
          ".hero-title-first, .hero-title-second",
        );
        if (
          hero &&
          copy &&
          lines?.length === 2 &&
          getComputedStyle(hero).overflow === "clip"
        ) {
          observed.introMotionFrames!.push({
            height: hero.getBoundingClientRect().height,
            copyTop: copy.getBoundingClientRect().top,
            titleY: Array.from(
              lines,
              (line) =>
                new DOMMatrixReadOnly(getComputedStyle(line).transform).m42,
            ),
          });
        }
        if (
          observed.introMotionFrames!.length < 120 ||
          observed
            .introMotionFrames!.at(-1)
            ?.titleY.some((value) => value !== 0)
        )
          requestAnimationFrame(observe);
      }
      requestAnimationFrame(observe);
    });

    let releaseJavaScript = () => {};
    const scriptsReleased = new Promise<void>((resolve) => {
      releaseJavaScript = resolve;
    });
    await page.route("**/_next/static/**/*.js", async (route) => {
      await scriptsReleased;
      await route.continue();
    });
    try {
      await page.goto("/", { waitUntil: "commit" });
      const hero = page.locator("#intro");
      await expect(hero).toHaveAttribute("data-scroll-scene", "false");
      await expect(hero.locator(".hero-stage")).toHaveCSS("position", "sticky");
      await expect
        .poll(() =>
          page.evaluate(
            () =>
              (
                window as Window & {
                  introMotionFrames?: IntroFrame[];
                }
              ).introMotionFrames?.length ?? 0,
          ),
        )
        .toBeGreaterThanOrEqual(12);
      releaseJavaScript();
      await expect(hero).toHaveAttribute("data-scroll-scene", "true");
      await expect
        .poll(() =>
          page.evaluate(
            () =>
              (
                window as Window & {
                  introMotionFrames?: IntroFrame[];
                }
              ).introMotionFrames?.length ?? 0,
          ),
        )
        .toBeGreaterThanOrEqual(100);
      await expect
        .poll(() =>
          page.evaluate(
            () =>
              (
                window as Window & {
                  introMotionFrames?: IntroFrame[];
                }
              ).introMotionFrames?.at(-1)?.titleY,
          ),
        )
        .toEqual([0, 0]);

      const frames = await page.evaluate(
        () =>
          (
            window as Window & {
              introMotionFrames?: IntroFrame[];
            }
          ).introMotionFrames ?? [],
      );
      expect(frames[0].height).toBeCloseTo(height * 1.75, 0);
      expect(frames.some((frame) => frame.titleY[0] > 10)).toBe(true);
      for (let index = 1; index < frames.length; index += 1) {
        const current = frames[index];
        const previous = frames[index - 1];
        expect(Math.abs(current.height - frames[0].height)).toBeLessThan(1);
        expect(Math.abs(current.copyTop - frames[0].copyTop)).toBeLessThan(1);
        for (let line = 0; line < 2; line += 1) {
          expect(current.titleY[line]).toBeLessThanOrEqual(
            previous.titleY[line] + 0.5,
          );
        }
      }
      expect(frames.at(-1)!.titleY).toEqual([0, 0]);
    } finally {
      releaseJavaScript();
    }
  });
}

for (const scenario of [
  { height: 900, reducedMotion: "reduce", label: "모션 감소" },
  { height: 700, reducedMotion: "no-preference", label: "낮은 화면" },
] as const) {
  test(`${scenario.label}에서는 인트로를 고정하지 않고 자연스럽게 읽을 수 있음`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: scenario.height });
    await page.emulateMedia({ reducedMotion: scenario.reducedMotion });
    await page.goto("/");
    const hero = page.locator("#intro");
    await expect(hero).toHaveAttribute("data-scroll-scene", "false");
    await expect(hero.locator(".hero-stage")).not.toHaveCSS(
      "position",
      "sticky",
    );
    await expect(hero).toHaveCSS("min-height", "0px");
    if (scenario.reducedMotion === "reduce") {
      await expect(hero.locator(".hero-title-first")).toHaveCSS(
        "animation-name",
        "none",
      );
      await expect(hero.locator(".hero-title-second")).toHaveCSS(
        "animation-name",
        "none",
      );
    }
  });
}
