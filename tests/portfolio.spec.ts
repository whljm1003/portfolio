import AxeBuilder from "@axe-core/playwright";
import {
  expect,
  test as base,
  type Locator,
  type Page,
  type TestInfo,
} from "@playwright/test";
import { featuredProjects } from "../assets/portfolio";

const projects = [
  "officener-app",
  "officener-web",
  "app-updates",
  "app-release",
  "app-observability",
] as const;

const careerArchives = [
  { slug: "select-shop", title: "쇼핑몰 서비스" },
  { slug: "flying-doctors", title: "해외 의료 지원 서비스" },
  { slug: "gold-rush", title: "금 거래 서비스" },
  { slug: "art-cms", title: "미술학원 관리 서비스" },
  { slug: "illo", title: "스타일 컨설팅 서비스" },
  { slug: "genetic-report", title: "유전자 검사 보고서 서비스" },
  { slug: "jajae-bada", title: "목재·자재 쇼핑몰 서비스" },
  { slug: "entizen", title: "충전 사업 역경매 서비스" },
] as const;

const courseArchives = [
  { slug: "wanted-reviews", title: "리뷰 조회, 등록 모바일 반응형 웹페이지" },
  { slug: "wanted-care", title: "간병인 신청하기 모바일 웹페이지" },
  { slug: "wanted-clothes", title: "쇼핑몰 의류 검색, 조회 웹페이지" },
  { slug: "wanted-game-records", title: "게임 전적 웹페이지" },
  { slug: "wanted-diagnostic-chart", title: "진단 검사 결과 페이지" },
  { slug: "wanted-disease-search", title: "병명 검색 추천 페이지" },
  { slug: "wanted-forest", title: "휴양림 조회/저장 웹페이지" },
  { slug: "wanted-dual-selector", title: "todoList 듀얼 셀렉터" },
] as const;

const filters = [
  { name: "전체", slugs: [...projects] },
  { name: "앱 개발", slugs: ["officener-app"] },
  { name: "웹 개발", slugs: ["officener-web"] },
  {
    name: "업데이트·운영",
    slugs: ["app-updates", "app-release", "app-observability"],
  },
];

const missingPage = "/not-a-real-portfolio-page";
const missingCasePage = "/work/not-a-real-case-study";
const removedPersonalPages = [
  "/work/pic-a-note",
  "/work/omomo",
  "/work/portfolio-original",
];
const contactEmail = "whljm1003@gmail.com";

const test = base.extend<{ runtimeErrors: string[] }>({
  runtimeErrors: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() !== "error") return;
        const expected404 =
          [missingPage, missingCasePage, ...removedPersonalPages].some((path) =>
            message.location().url.includes(path),
          ) && message.text().includes("404");
        if (!expected404) errors.push(message.text());
      });

      await use(errors);
      expect(errors, "화면에서 콘솔 오류 또는 실행 오류가 발생함").toEqual([]);
    },
    { auto: true },
  ],
});

async function loadAllImages(page: Page) {
  const images = page.locator("main img:visible");
  for (const image of await images.all()) {
    const inScrollScene = await image.evaluate((element) => {
      const runway = element.closest<HTMLElement>(
        '.capability-runway[data-scroll-scene="true"]',
      );
      const card = element.closest(".capability-card");
      if (!runway || !card) return false;
      const cards = Array.from(runway.querySelectorAll(".capability-card"));
      window.scrollTo({
        top:
          runway.getBoundingClientRect().top +
          window.scrollY +
          ((runway.offsetHeight - window.innerHeight) * cards.indexOf(card)) /
            (cards.length - 1),
        behavior: "instant",
      });
      return true;
    });
    if (!inScrollScene) await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty("complete", true);
    await expect
      .poll(() =>
        image.evaluate((element: HTMLImageElement) => element.naturalWidth),
      )
      .toBeGreaterThan(0);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
}

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
  }));
  expect(dimensions.document, "문서가 화면 너비를 넘어감").toBeLessThanOrEqual(
    dimensions.viewport + 1,
  );
  expect(dimensions.body, "본문이 화면 너비를 넘어감").toBeLessThanOrEqual(
    dimensions.viewport + 1,
  );
}

async function expectAccessible(page: Page, label: string, testInfo: TestInfo) {
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  const violations = result.violations.filter(
    (violation) =>
      violation.impact === "serious" || violation.impact === "critical",
  );
  if (violations.length > 0) {
    await testInfo.attach(`${label} 접근성 위반`, {
      body: Buffer.from(JSON.stringify(violations, null, 2)),
      contentType: "application/json",
    });
  }
  expect
    .soft(
      violations.map((violation) => ({
        rule: violation.id,
        impact: violation.impact,
        nodes: violation.nodes.map((node) => ({
          target: node.target,
          summary: node.failureSummary,
        })),
      })),
      `${label} 접근성 위반`,
    )
    .toEqual([]);
}

async function expectContactAccessible(page: Page) {
  const result = await new AxeBuilder({ page })
    .include("#contact")
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(
    result.violations.filter(
      (violation) =>
        violation.impact === "serious" || violation.impact === "critical",
    ),
  ).toEqual([]);
}

async function expectVisibleFocus(locator: Locator) {
  await expect(locator).toBeFocused();
  const hasFocusIndicator = await locator.evaluate((element) => {
    const style = window.getComputedStyle(element);
    return (
      (style.outlineStyle !== "none" &&
        Number.parseFloat(style.outlineWidth) > 0 &&
        style.outlineColor !== "transparent") ||
      style.boxShadow !== "none"
    );
  });
  expect(hasFocusIndicator, "키보드 포커스가 시각적으로 표시되어야 함").toBe(
    true,
  );
}

async function expectCapabilityPanelVisible(card: Locator) {
  await expect
    .poll(() =>
      card.evaluate((element) => {
        const frame = element.closest(".capability-viewport");
        if (!frame) throw new Error("역량 장면의 표시 영역이 없음");
        const panelBounds = element.getBoundingClientRect();
        const frameBounds = frame.getBoundingClientRect();
        return Math.abs(
          panelBounds.left +
            panelBounds.width / 2 -
            (frameBounds.left + frameBounds.width / 2),
        );
      }),
    )
    .toBeLessThanOrEqual(1);
  for (const content of [card.locator("h3"), card.locator("a")]) {
    await expect
      .poll(() =>
        content.evaluate((element) => {
          const frame = element.closest(".capability-viewport");
          if (!frame) throw new Error("역량 장면의 표시 영역이 없음");
          const bounds = element.getBoundingClientRect();
          const frameBounds = frame.getBoundingClientRect();
          return (
            bounds.left >= Math.max(0, frameBounds.left) - 1 &&
            bounds.right <=
              Math.min(window.innerWidth, frameBounds.right) + 1 &&
            bounds.top >= Math.max(0, frameBounds.top) - 1 &&
            bounds.bottom <=
              Math.min(window.innerHeight, frameBounds.bottom) + 1
          );
        }),
      )
      .toBe(true);
  }
  await expect
    .poll(() =>
      card.locator("a").evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        const hit = document.elementFromPoint(
          bounds.left + bounds.width / 2,
          bounds.top + bounds.height / 2,
        );
        return element === hit || element.contains(hit);
      }),
    )
    .toBe(true);
}

async function tabTo(page: Page, target: Locator) {
  for (let index = 0; index < 30; index += 1) {
    await page.keyboard.press("Tab");
    if (
      await target.evaluate((element) => element === document.activeElement)
    ) {
      await expectVisibleFocus(target);
      return;
    }
  }
  throw new Error("Tab 키로 대상 요소에 도달하지 못했음");
}

async function expectInlineDetail(page: Page, slug: string) {
  const project = featuredProjects.find((item) => item.slug === slug);
  if (!project) throw new Error(`대표 사례 ${slug}의 데이터가 없음`);
  await expect(page).toHaveURL(new RegExp(`/work/${slug}$`));
  await expect(page.locator(".portfolio-workspace")).toHaveAttribute(
    "data-detail-open",
    "true",
  );
  const detail = page.getByRole("region", { name: "사례 상세", exact: true });
  await expect(detail).toBeVisible();
  await expect(detail).toHaveClass(/workspace-detail/);
  const title = detail.locator(`#inline-case-title-${slug}`);
  await expect(title).toHaveText(project.title);
  await expect(title).toHaveJSProperty("tagName", "H2");
  await expect(page.locator("#hero-title")).toBeVisible();
  await expect(page.locator("#work")).toBeVisible();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(
    detail.getByRole("link", { name: "상세 닫기", exact: true }),
  ).toHaveAttribute("href", "/#work");
  return detail;
}

async function expectProjectImpact(container: Locator, slug: string) {
  const metrics = featuredProjects.find(
    (project) => project.slug === slug,
  )?.impactMetrics;
  if (!metrics?.length) throw new Error(`${slug}의 성과 지표 구성이 없음`);
  const section = container.getByRole("region", {
    name: "정량 성과 지표",
    exact: true,
  });
  await expect(section).toBeVisible();
  await expect(section.locator(".impact-metric")).toHaveCount(metrics.length);
  for (const [index, metric] of metrics.entries()) {
    const slot = section.locator(".impact-metric").nth(index);
    await expect(slot.locator(".impact-metric-label")).toHaveText(metric.label);
    await expect(slot.locator("[data-metric-status]")).toHaveAttribute(
      "data-metric-status",
      "pending",
    );
    await expect(slot.locator("[data-metric-value]")).toHaveText("—");
    await expect(slot.locator(".impact-metric-comparison dt")).toHaveText([
      "개선 전",
      "개선 후",
    ]);
    await expect(slot.locator(".impact-metric-contribution")).toHaveText(
      metric.contribution,
    );
    await expect(slot.locator(".impact-measurement")).toContainText(
      metric.measurement.criterion,
    );
    await expect(slot.locator(".impact-metric-comparison dd")).toHaveText([
      `—${metric.unit}`,
      `—${metric.unit}`,
    ]);
  }
}

async function captureScreen(
  page: Page,
  label: string,
  testInfo: TestInfo,
  fullPage = true,
) {
  const screenshot = testInfo.outputPath(`${label}.png`);
  await page.screenshot({ path: screenshot, fullPage, animations: "disabled" });
  await testInfo.attach(label, { path: screenshot, contentType: "image/png" });
}

for (const width of [360, 390, 768, 1440]) {
  test(`${width}px에서 메인·대표 사례의 이미지·너비·화면을 확인함`, async ({
    page,
  }, testInfo) => {
    test.setTimeout(120_000);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", ...projects.map((slug) => `/work/${slug}`)]) {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await loadAllImages(page);
      await expectNoHorizontalOverflow(page);
      if (width === 1440 && path !== "/") {
        await expectProjectImpact(
          page.locator("main"),
          path.split("/").at(-1)!,
        );
      }
      for (const artwork of await page.locator(".app-art").all()) {
        const bounds = await artwork.evaluate((element) => ({
          titleBottom: element
            .querySelector(".art-word")
            ?.getBoundingClientRect().bottom,
          imageTop: element
            .querySelector(".app-screen")
            ?.getBoundingClientRect().top,
        }));
        expect(
          bounds.imageTop,
          "앱 소개 제목과 제품 이미지가 겹치면 안 됨",
        ).toBeGreaterThanOrEqual(bounds.titleBottom ?? 0);
      }
      for (const artwork of await page.locator(".web-art").all()) {
        const bounds = await artwork.evaluate((element) => {
          const frame = element.getBoundingClientRect();
          return {
            left: frame.left,
            right: frame.right,
            parts: Array.from(
              element.querySelectorAll(
                ".web-diagram, .diagram-node, .diagram-core",
              ),
              (part) => {
                const rect = part.getBoundingClientRect();
                return {
                  label: part.textContent?.trim(),
                  left: rect.left,
                  right: rect.right,
                };
              },
            ),
          };
        });
        for (const part of bounds.parts) {
          const message = `${width}px ${path}: ${part.label} 도식이 잘리면 안 됨`;
          expect(part.left, message).toBeGreaterThanOrEqual(bounds.left - 1);
          expect(part.right, message).toBeLessThanOrEqual(bounds.right + 1);
        }
      }
      const filename = path === "/" ? "home" : path.split("/").at(-1);
      const screenshot = testInfo.outputPath(`${width}-${filename}.png`);
      await page.screenshot({
        path: screenshot,
        fullPage: true,
        animations: "disabled",
      });
      await testInfo.attach(`${width}px ${filename}`, {
        path: screenshot,
        contentType: "image/png",
      });
      if (path === "/") {
        const career = page.locator("#career");
        await career
          .locator("summary")
          .filter({ hasText: "코스 프로젝트 보기" })
          .click();
        for (const { slug } of [...careerArchives, ...courseArchives]) {
          await expect(career.locator(`a[href="/work/${slug}"]`)).toBeVisible();
        }
        await expect(career.getByText("이전 개인 프로젝트")).toHaveCount(0);
        await expect(career.locator("img:visible")).toHaveCount(0);
        await loadAllImages(page);
        await expectNoHorizontalOverflow(page);
        const expandedScreenshot = testInfo.outputPath(
          `${width}-home-expanded.png`,
        );
        await page.screenshot({
          path: expandedScreenshot,
          fullPage: true,
          animations: "disabled",
        });
        await testInfo.attach(`${width}px 기존 프로젝트 펼치기`, {
          path: expandedScreenshot,
          contentType: "image/png",
        });
      }
    }
  });
}

test("코스 프로젝트를 키보드로 펼치고 접을 수 있음", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/#career");
  for (const label of ["코스 프로젝트 보기"]) {
    const summary = page.locator("#career summary").filter({ hasText: label });
    const disclosure = summary.locator("..");
    await summary.focus();
    await expectVisibleFocus(summary);
    await page.keyboard.press("Enter");
    await expect(disclosure).toHaveJSProperty("open", true);
    await expect(disclosure.locator("a").first()).toBeVisible();
    await page.keyboard.press("Space");
    await expect(disclosure).toHaveJSProperty("open", false);
    await expect(disclosure.locator("a").first()).toBeHidden();
  }
});

for (const archive of [...careerArchives, ...courseArchives]) {
  test(`${archive.slug} 기존 사례의 상세 자료와 복귀 경로를 보존함`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    const response = await page.goto(`/work/${archive.slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      archive.title,
    );
    for (const title of [
      "프로젝트 소개",
      "내가 맡은 작업",
      "작업을 마친 뒤",
      "사용한 기술",
      "관련 링크",
    ]) {
      await expect(
        page.getByRole("heading", { name: title, exact: true }),
      ).toBeVisible();
    }
    const externalLinks = page.locator("main a[target='_blank']");
    expect(await externalLinks.count()).toBeGreaterThan(0);
    for (const link of await externalLinks.all()) {
      await expect(link).toHaveAttribute("href", /^https:\/\//);
      await expect(link).toHaveAttribute("rel", /noopener/);
    }
    await expectNoHorizontalOverflow(page);
    await page.getByRole("link", { name: "경력·이전 작업 보기" }).click();
    await expect(page).toHaveURL(/\/#career$/);
    await expect(page.locator("#career")).toBeInViewport();
  });
}

test("대표 작업 필터가 선택 상태와 해당 사례만 표시함", async ({ page }) => {
  await page.goto("/#work");
  const work = page.locator("#work");
  for (const filter of filters) {
    const button = work.getByRole("button", { name: filter.name, exact: true });
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(work.locator('button[aria-pressed="true"]')).toHaveCount(1);
    for (const slug of projects) {
      const link = work.locator(`a[href="/work/${slug}"]`);
      if (filter.slugs.includes(slug)) await expect(link).toBeVisible();
      else await expect(link).toBeHidden();
    }
  }
});

test("필터에 키보드로 접근하고 선택할 수 있음", async ({ page }) => {
  await page.goto("/");
  const appFilter = page.getByRole("button", { name: "앱 개발", exact: true });
  await tabTo(page, appFilter);
  await page.keyboard.press("Enter");
  await expect(appFilter).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.locator('#work a[href="/work/officener-app"]'),
  ).toBeVisible();
});

for (const reducedMotion of ["no-preference", "reduce"] as const) {
  test(`${reducedMotion} 설정에 맞춰 작업 카드의 재배치가 움직이거나 즉시 완료됨`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion });
    await page.goto("/#work");
    const samples = await page.evaluate(async () => {
      const card = document.querySelector(".work-item-operations");
      const filter = Array.from(
        document.querySelectorAll<HTMLButtonElement>(".work-filters button"),
      ).find((button) => button.textContent?.startsWith("업데이트·운영"));
      if (!card || !filter) throw new Error("카드와 필터가 없음");
      const samples: { y: number; scale: number }[] = [];
      filter.click();
      for (let frame = 0; frame < 24; frame += 1) {
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => resolve()),
        );
        const matrix = new DOMMatrixReadOnly(getComputedStyle(card).transform);
        samples.push({ y: matrix.m42, scale: matrix.m11 });
      }
      return samples;
    });
    const moved = samples.some(
      (sample) => Math.abs(sample.y) > 4 || Math.abs(sample.scale - 1) > 0.002,
    );
    expect(moved, "시스템 동작 설정과 카드 재배치 모션이 일치해야 함").toBe(
      reducedMotion === "no-preference",
    );
    await expect(
      page.locator('#work [data-testid="project-card"]'),
    ).toHaveCount(3);
    await expectNoHorizontalOverflow(page);
  });
}

for (const slug of projects) {
  test(`${slug} 사례를 메인 옆에서 읽고 작업 목록으로 돌아옴`, async ({
    page,
  }) => {
    await page.goto("/#work");
    await page.locator(`#work a[href="/work/${slug}"]`).click();
    const detail = await expectInlineDetail(page, slug);
    await expectProjectImpact(detail, slug);
    await detail.getByRole("link", { name: "상세 닫기", exact: true }).click();
    await expect(page).toHaveURL(/\/#work$/);
    await expect(page.getByRole("region", { name: "사례 상세" })).toHaveCount(
      0,
    );
    await expect(page.locator("#work")).toBeInViewport();
  });
}

test("1440px 상세는 본문 공간을 확보해 열리고 필터·사례 교체 상태를 보존함", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/#work");
  const work = page.locator("#work");
  const operations = work.getByRole("button", {
    name: "업데이트·운영",
    exact: true,
  });
  await operations.click();
  await work.locator('a[href="/work/app-updates"]').click();
  let detail = await expectInlineDetail(page, "app-updates");
  await expect(operations).toHaveAttribute("aria-pressed", "true");
  await expect(work.locator('a[href="/work/officener-app"]')).toBeHidden();

  const workspace = page.locator(".portfolio-workspace");
  await expect
    .poll(async () => {
      const outer = await workspace.boundingBox();
      const panel = await detail.boundingBox();
      if (!outer || !panel) return 0;
      return panel.width / outer.width;
    })
    .toBeGreaterThan(0.28);
  const outer = await workspace.boundingBox();
  const panel = await detail.boundingBox();
  expect(outer).not.toBeNull();
  expect(panel).not.toBeNull();
  expect(panel!.width / outer!.width).toBeLessThan(0.36);
  expect(panel!.x).toBeGreaterThan(outer!.x + outer!.width * 0.55);
  expect(panel!.x + panel!.width).toBeLessThanOrEqual(
    outer!.x + outer!.width + 1,
  );
  await expectNoHorizontalOverflow(page);
  await captureScreen(page, "1440-workspace-updates", testInfo, false);

  await work.locator('a[href="/work/app-release"]').click();
  detail = await expectInlineDetail(page, "app-release");
  await expect(page.locator("#inline-case-title-app-updates")).toHaveCount(0);
  await expect(page.getByRole("region", { name: "사례 상세" })).toHaveCount(1);
  await expect(operations).toHaveAttribute("aria-pressed", "true");
  await expect(work.locator('[data-testid="project-card"]')).toHaveCount(3);
  await expectProjectImpact(detail, "app-release");
  await detail.getByRole("link", { name: "상세 닫기", exact: true }).click();
  await expect(page).toHaveURL(/\/#work$/);
  await expect(operations).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".portfolio-workspace")).toHaveAttribute(
    "data-detail-open",
    "false",
  );
});

test("Escape로 상세를 닫으면 원래 카드의 키보드 포커스와 메인 위치가 복원됨", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#work");
  const appFilter = page.getByRole("button", { name: "앱 개발", exact: true });
  await appFilter.click();
  const trigger = page.locator('#work a[href="/work/officener-app"]');
  await tabTo(page, trigger);
  await expectVisibleFocus(trigger);
  const beforeScroll = await page.evaluate(() => window.scrollY);
  await page.keyboard.press("Enter");
  const detail = await expectInlineDetail(page, "officener-app");
  await expect(
    detail.locator("#inline-case-title-officener-app"),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page).toHaveURL(/\/#work$/);
  await expect(page.getByRole("region", { name: "사례 상세" })).toHaveCount(0);
  await expectVisibleFocus(trigger);
  await expect(appFilter).toHaveAttribute("aria-pressed", "true");
  await expect
    .poll(async () =>
      Math.abs((await page.evaluate(() => window.scrollY)) - beforeScroll),
    )
    .toBeLessThanOrEqual(2);
});

test("브라우저 뒤로·앞으로 이동해도 사례 상세와 메인 필터가 함께 복원됨", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#work");
  const operations = page.getByRole("button", {
    name: "업데이트·운영",
    exact: true,
  });
  await operations.click();
  await page.locator('#work a[href="/work/app-updates"]').click();
  await expectInlineDetail(page, "app-updates");
  await page.locator('#work a[href="/work/app-observability"]').click();
  await expectInlineDetail(page, "app-observability");

  await page.goBack();
  await expectInlineDetail(page, "app-updates");
  await expect(operations).toHaveAttribute("aria-pressed", "true");
  await page.goBack();
  await expect(page).toHaveURL(/\/#work$/);
  await expect(page.getByRole("region", { name: "사례 상세" })).toHaveCount(0);
  await expect(operations).toHaveAttribute("aria-pressed", "true");
  await page.goForward();
  await expectInlineDetail(page, "app-updates");
  await page.goForward();
  await expectInlineDetail(page, "app-observability");
  await expect(operations).toHaveAttribute("aria-pressed", "true");
});

test("상세에서 헤더 목적지와 소개 링크로 이동하면 이전 카드 복원이 앵커 이동을 덮어쓰지 않음", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const destination of [
    { name: "성과", anchor: "impact" },
    { name: "역량", anchor: "capabilities" },
    { name: "소개", anchor: "about" },
    { name: "경력", anchor: "career" },
    { name: "연락", anchor: "contact" },
    { name: "DEAN 이정민 홈", anchor: "top" },
    { name: "작업", anchor: "work" },
    { name: "개발자 소개", anchor: "about" },
  ]) {
    await page.goto("/#work");
    const trigger = page.locator('#work a[href="/work/officener-app"]');
    await trigger.click();
    await expectInlineDetail(page, "officener-app");
    await page
      .locator(
        destination.name === "개발자 소개"
          ? ".workspace-main .hero"
          : ".workspace-main .site-header",
      )
      .getByRole("link", {
        name: destination.name,
        exact: true,
      })
      .click();
    await expect(page).toHaveURL(
      destination.anchor === "top"
        ? /\/$/
        : new RegExp(`/#${destination.anchor}$`),
    );
    await expect(page.getByRole("region", { name: "사례 상세" })).toHaveCount(
      0,
    );
    await expect(trigger).not.toBeFocused();
    await expect
      .poll(() =>
        page.locator(`#${destination.anchor}`).evaluate((element) => {
          const root = document.documentElement;
          const padding =
            Number.parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
          const margin =
            Number.parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
          const target =
            element.id === "top"
              ? 0
              : element.getBoundingClientRect().top +
                window.scrollY -
                padding -
                margin;
          const limit = root.scrollHeight - window.innerHeight;
          return Math.abs(
            window.scrollY - Math.max(0, Math.min(target, limit)),
          );
        }),
      )
      .toBeLessThanOrEqual(2);
  }
});

test("상세 A·B를 뒤로·앞으로 이동하면 각 사례에서 읽던 스크롤 위치가 복원됨", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#work");
  await page.locator('#work a[href="/work/officener-app"]').click();
  let detail = await expectInlineDetail(page, "officener-app");
  await expect(
    detail.locator("#inline-case-title-officener-app"),
  ).toBeFocused();
  await detail.evaluate((element) => {
    element.scrollTop = 750;
  });
  await expect(detail).toHaveJSProperty("scrollTop", 750);

  await page.locator('#work a[href="/work/app-release"]').click();
  detail = await expectInlineDetail(page, "app-release");
  await expect(detail.locator("#inline-case-title-app-release")).toBeFocused();
  await expect(detail).toHaveJSProperty("scrollTop", 0);
  await detail.evaluate((element) => {
    element.scrollTop = 430;
  });
  await expect(detail).toHaveJSProperty("scrollTop", 430);

  await page.goBack();
  detail = await expectInlineDetail(page, "officener-app");
  await expect(detail).toHaveJSProperty("scrollTop", 750);
  await page.goForward();
  detail = await expectInlineDetail(page, "app-release");
  await expect(detail).toHaveJSProperty("scrollTop", 430);
});

for (const width of [360, 390, 768]) {
  test(`${width}px 모바일 상세에서 읽던 문서 위치를 히스토리와 Escape 닫기 뒤에 복원함`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/#work");
    const trigger = page.locator('#work a[href="/work/officener-web"]');
    await trigger.click();
    let detail = await expectInlineDetail(page, "officener-web");
    await expect(
      detail.locator("#inline-case-title-officener-web"),
    ).toBeFocused();
    const readingPosition = await detail.evaluate((element) =>
      Math.round(element.getBoundingClientRect().top + window.scrollY + 750),
    );
    await page.evaluate((top) => {
      window.scrollTo({ top, behavior: "instant" });
    }, readingPosition);
    await expect
      .poll(async () =>
        Math.abs((await page.evaluate(() => window.scrollY)) - readingPosition),
      )
      .toBeLessThanOrEqual(2);

    await page.goBack();
    await expect(page.getByRole("region", { name: "사례 상세" })).toHaveCount(
      0,
    );
    await expect(trigger).toBeFocused();
    await page.goForward();
    detail = await expectInlineDetail(page, "officener-web");
    await expect(detail).toBeFocused();
    await expect
      .poll(async () =>
        Math.abs((await page.evaluate(() => window.scrollY)) - readingPosition),
      )
      .toBeLessThanOrEqual(2);

    await page.keyboard.press("Escape");
    await expect(page).toHaveURL(/\/#work$/);
    await expect(trigger).toBeFocused();
    await page.goBack();
    detail = await expectInlineDetail(page, "officener-web");
    await expect(detail).toBeFocused();
    await expect
      .poll(async () =>
        Math.abs((await page.evaluate(() => window.scrollY)) - readingPosition),
      )
      .toBeLessThanOrEqual(2);
  });
}

test("상세 URL 새로고침과 직접 진입·다음 사례는 독립 페이지로 읽을 수 있음", async ({
  page,
}) => {
  await page.goto("/#work");
  await page.locator('#work a[href="/work/officener-app"]').click();
  await expectInlineDetail(page, "officener-app");
  await page.reload();
  await expect(page).toHaveURL(/\/work\/officener-app$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "오피스너 앱",
  );
  await expect(page.locator("#hero-title")).toHaveCount(0);
  await expect(page.getByRole("region", { name: "사례 상세" })).toHaveCount(0);
  const next = page.locator('.detail-next a[href="/work/officener-web"]');
  await expect(next).toContainText("다음 사례");
  await next.click();
  await expect(page).toHaveURL(/\/work\/officener-web$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "오피스너 웹",
  );
  await expect(page.locator("#hero-title")).toHaveCount(0);
  await page.goto("/work/app-release");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "앱 빌드와 배포",
  );
  await expect(
    page.getByRole("link", { name: "작업 목록으로", exact: true }),
  ).toHaveAttribute("href", "/#work");
});

for (const width of [360, 390, 768]) {
  test(`${width}px 상세는 메인 다음의 일반 섹션으로 배치되며 가로 넘침이 없음`, async ({
    page,
  }, testInfo) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/#work");
    await page.locator('#work a[href="/work/officener-web"]').click();
    const detail = await expectInlineDetail(page, "officener-web");
    const main = page.locator("#main-content");
    const mainBounds = await main.boundingBox();
    const detailBounds = await detail.boundingBox();
    expect(mainBounds).not.toBeNull();
    expect(detailBounds).not.toBeNull();
    expect(detailBounds!.y).toBeGreaterThanOrEqual(
      mainBounds!.y + mainBounds!.height - 1,
    );
    expect(detailBounds!.width).toBeGreaterThanOrEqual(width * 0.9);
    expect(detailBounds!.x + detailBounds!.width).toBeLessThanOrEqual(
      width + 1,
    );
    const presentation = await detail.evaluate((element) => ({
      position: getComputedStyle(element).position,
      modal: element.getAttribute("aria-modal"),
      bodyOverflow: getComputedStyle(document.body).overflowY,
    }));
    expect(presentation.position).not.toBe("fixed");
    expect(presentation.modal).not.toBe("true");
    expect(presentation.bodyOverflow).not.toBe("hidden");
    await expect(
      detail.locator("#inline-case-title-officener-web"),
    ).toBeInViewport();
    await expectNoHorizontalOverflow(page);
    await captureScreen(page, `${width}-workspace-web`, testInfo);
    await detail.getByRole("link", { name: "상세 닫기", exact: true }).click();
    await expect(page).toHaveURL(/\/#work$/);
    await expect(
      page.locator('#work a[href="/work/officener-web"]'),
    ).toBeFocused();
    await expect(page.locator("#work")).toBeInViewport();
  });
}

test("모바일 메뉴를 키보드로 열고 Escape로 닫으며 포커스를 돌려줌", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/");
  const opener = page.getByRole("button", { name: "메뉴 열기", exact: true });
  const navigation = page.getByRole("navigation", {
    name: "모바일 내비게이션",
  });
  await expect(opener).toBeVisible();
  await expect(navigation).toBeHidden();
  await tabTo(page, opener);
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "메뉴 닫기" })).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await expect(navigation).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(navigation).toBeHidden();
  await expectVisibleFocus(opener);
});

test("모바일 메뉴에서 각 구획으로 이동하고 메뉴가 닫힘", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 900 });
  await page.goto("/");
  for (const anchor of [
    "impact",
    "capabilities",
    "work",
    "about",
    "career",
    "contact",
  ]) {
    await page.getByRole("button", { name: "메뉴 열기", exact: true }).click();
    const navigation = page.getByRole("navigation", {
      name: "모바일 내비게이션",
    });
    await navigation
      .locator(`a[href="/#${anchor}"], a[href="#${anchor}"]`)
      .click();
    await expect(page).toHaveURL(new RegExp(`#${anchor}$`));
    await expect(navigation).toBeHidden();
    await expect(page.locator(`#${anchor}`)).toBeInViewport();
    await expectNoHorizontalOverflow(page);
  }
});

for (const width of [390, 1440]) {
  test(`${width}px 내비게이션은 여섯 섹션으로 이동하고 현재 위치를 표시함`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    const navigation = page.getByRole("navigation", {
      name: width < 1024 ? "모바일 내비게이션" : "주 내비게이션",
      exact: true,
      includeHidden: true,
    });
    await expect(navigation.locator("a")).toHaveCount(6);
    for (const anchor of [
      "impact",
      "capabilities",
      "work",
      "about",
      "career",
      "contact",
    ]) {
      if (width < 1024) {
        await page
          .getByRole("button", { name: "메뉴 열기", exact: true })
          .click();
      }
      const link = navigation.locator(`a[href="/#${anchor}"]`);
      await link.click();
      await expect(page).toHaveURL(new RegExp(`#${anchor}$`));
      await expect(page.locator(`#${anchor}`)).toBeInViewport();
      await expect(link).toHaveAttribute("aria-current", "location");
      await expect(
        navigation.locator('a[aria-current="location"]'),
      ).toHaveCount(1);
    }
  });
}

test("이메일 주소를 복사하고 접근 가능한 성공 상태를 표시함", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (value: string) => {
          window.sessionStorage.setItem("copiedEmail", value);
        },
      },
    });
  });
  await page.goto("/#contact");
  await page
    .getByRole("button", { name: "이메일 주소 복사", exact: true })
    .click();
  await expect(page.locator("#contact").getByRole("status")).toHaveText(
    "이메일 주소를 복사했습니다.",
  );
  expect(await page.evaluate(() => sessionStorage.getItem("copiedEmail"))).toBe(
    contactEmail,
  );
  await expectContactAccessible(page);
});

test("복사가 거부되면 오류와 직접 복사할 이메일 주소를 표시함", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async () => {
          throw new DOMException("클립보드 접근이 거부됨", "NotAllowedError");
        },
      },
    });
  });
  await page.goto("/#contact");
  await page
    .getByRole("button", { name: "이메일 주소 복사", exact: true })
    .click();
  await expect(page.locator("#contact").getByRole("status")).toHaveText(
    "복사하지 못했습니다. 이메일 주소를 선택해 직접 복사해 주세요.",
  );
  await expect(
    page.locator("#contact").getByText(contactEmail, { exact: true }),
  ).toBeVisible();
  await expectContactAccessible(page);
});

test("클립보드를 지원하지 않아도 직접 복사 안내를 표시함", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: undefined,
    });
  });
  await page.goto("/#contact");
  await page
    .getByRole("button", { name: "이메일 주소 복사", exact: true })
    .click();
  await expect(page.locator("#contact").getByRole("status")).toHaveText(
    "복사하지 못했습니다. 이메일 주소를 선택해 직접 복사해 주세요.",
  );
  await expect(
    page.locator("#contact").getByText(contactEmail, { exact: true }),
  ).toBeVisible();
});

test("이메일 복사 처리 중에는 버튼을 비활성화하고 완료 뒤 복원함", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: () =>
          new Promise<void>((resolve) => {
            (window as Window & { completeCopy?: () => void }).completeCopy =
              resolve;
          }),
      },
    });
  });
  await page.goto("/#contact");
  await page
    .getByRole("button", { name: "이메일 주소 복사", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "복사 중", exact: true }),
  ).toBeDisabled();
  await page.evaluate(() =>
    (window as Window & { completeCopy?: () => void }).completeCopy?.(),
  );
  await expect(
    page.getByRole("button", { name: "복사 완료", exact: true }),
  ).toBeEnabled();
});

test("연락처는 기존 개인 이메일과 GitHub·블로그로 연결됨", async ({ page }) => {
  await page.goto("/#contact");
  const contact = page.locator("#contact");
  await expect(
    contact.locator(`a[href="mailto:${contactEmail}"]`),
  ).toBeVisible();
  for (const url of [
    "https://github.com/whljm1003",
    "https://velog.io/@whljm1003",
  ]) {
    const link = contact.locator(`a[href="${url}"]`);
    await expect(link).toBeVisible();
    if ((await link.getAttribute("target")) === "_blank") {
      await expect(link).toHaveAttribute("rel", /noopener/);
    }
  }
});

test("없는 주소에 404와 홈 복귀 경로를 제공함", async ({ page }) => {
  for (const path of [missingPage, missingCasePage, ...removedPersonalPages]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const homeLink = page.locator("main").locator('a[href="/"]').first();
    await expect(homeLink).toBeVisible();
    await homeLink.click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
});

test("제목은 순차적으로 올라오며 등장 모션 도중에도 소개 글자의 대비를 유지함", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => {
    type HeroFrame = { y: number[]; opacity: number[]; copyOpacity: number };
    const observed = window as Window & { heroFrames?: HeroFrame[] };
    observed.heroFrames = [];
    let frames = 0;
    const observe = () => {
      const lines = Array.from(
        document.querySelectorAll(".hero-title-first, .hero-title-second"),
      );
      const copy = document.querySelector(".hero-copy");
      if (lines.length === 2 && copy) {
        observed.heroFrames!.push({
          y: lines.map(
            (line) =>
              new DOMMatrixReadOnly(getComputedStyle(line).transform).m42,
          ),
          opacity: lines.map((line) => Number(getComputedStyle(line).opacity)),
          copyOpacity: Number(getComputedStyle(copy).opacity),
        });
      }
      frames += 1;
      if (frames < 180) requestAnimationFrame(observe);
    };
    requestAnimationFrame(observe);
  });
  await page.goto("/");
  await expect
    .poll(() =>
      page.evaluate(() =>
        (
          window as Window & {
            heroFrames?: { y: number[] }[];
          }
        ).heroFrames?.some((frame) => frame.y.some((value) => value > 10)),
      ),
    )
    .toBe(true);
  await expect
    .poll(() =>
      page
        .locator("#hero-title")
        .evaluate((element) =>
          Array.from(
            element.querySelectorAll(".hero-title-first, .hero-title-second"),
          ).every(
            (line) =>
              Math.abs(
                new DOMMatrixReadOnly(getComputedStyle(line).transform).m42,
              ) < 0.5,
          ),
        ),
    )
    .toBe(true);
  const frames = await page.evaluate(
    () =>
      (
        window as Window & {
          heroFrames?: {
            y: number[];
            opacity: number[];
            copyOpacity: number;
          }[];
        }
      ).heroFrames ?? [],
  );
  expect(frames.some((frame) => frame.y[1] > frame.y[0] + 2)).toBe(true);
  for (const frame of frames.filter((frame) =>
    frame.y.some((value) => value > 1),
  )) {
    expect(frame.opacity).toEqual([1, 1]);
    expect(frame.copyOpacity).toBe(1);
  }
});

test("인트로는 확인된 개발 범위를 보여주고 미측정 개선율을 주장하지 않음", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("#change")).toHaveCount(0);
  await expect(page.getByText("AS-IS", { exact: true })).toHaveCount(0);
  await expect(page.getByText("TO-BE", { exact: true })).toHaveCount(0);
  const impact = page.locator("#impact");
  await expect(impact.locator(".impact-metric")).toHaveCount(3);
  await expect(impact.locator("[data-experience-value]")).toHaveText([
    "8",
    "14",
    "2",
  ]);
  await expect(impact.locator(".impact-metric-label")).toHaveText([
    "SI 웹 서비스 개발",
    "키보드·스크롤 처리 이관",
    "React Native 업그레이드",
  ]);
  await expect(impact.getByText("수치 확인 예정")).toHaveCount(0);
  await expect(impact.getByText("개선 전", { exact: true })).toHaveCount(0);
  await expect(impact.getByText("개선 후", { exact: true })).toHaveCount(0);
  await expect(impact.getByText("0.70.6", { exact: true })).toBeVisible();
  await expect(
    impact.getByText("0.78 계열 → 0.85.3", { exact: true }),
  ).toBeVisible();
  await expect(impact.locator(".impact-metric-number")).not.toContainText([
    "%",
    "%",
    "%",
  ]);
  const measurement = impact.locator(".impact-measurement").first();
  const summary = measurement.locator("summary");
  await summary.focus();
  await expectVisibleFocus(summary);
  await page.keyboard.press("Enter");
  await expect(measurement).toHaveAttribute("open", "");
  await expect(measurement.locator("p").first()).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(measurement).not.toHaveAttribute("open");
  const capabilities = page.locator("#capabilities");
  await expect(capabilities.locator(".capability-card")).toHaveCount(3);
  await capabilities.locator('a[href="/work/officener-web"]').click();
  await expectInlineDetail(page, "officener-web");
  await captureScreen(page, "1440-impact-workspace", testInfo, false);
});

for (const width of [390, 1440]) {
  test(`${width}px에서 JavaScript가 없어도 소개·성과·전체 역량을 세로로 읽을 수 있음`, async ({
    browser,
  }, testInfo) => {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      reducedMotion: "no-preference",
      viewport: { width, height: 900 },
      baseURL: testInfo.project.use.baseURL,
    });
    try {
      const page = await context.newPage();
      const response = await page.goto("/");
      expect(response?.status()).toBe(200);
      await expect(page.locator("#hero-title")).toBeVisible();
      await expect(page.locator(".hero-stage")).not.toHaveCSS(
        "position",
        "sticky",
      );
      await expect(page.locator("#impact [data-experience-value]")).toHaveText([
        "8",
        "14",
        "2",
      ]);
      const runway = page.locator(".capability-runway");
      await expect(runway).toHaveAttribute("data-scroll-scene", "false");
      await expect(page.locator("#capabilities h3")).toHaveCount(3);
      for (const link of await runway.locator("a").all()) {
        await link.scrollIntoViewIfNeeded();
        await expect(link).toBeInViewport();
      }
      await expect(page.locator(".capability-track")).toHaveCSS(
        "transform",
        "none",
      );
      await expectNoHorizontalOverflow(page);
      await captureScreen(page, `${width}-home-without-javascript`, testInfo);
    } finally {
      await context.close();
    }
  });
}

for (const [width, height] of [
  [320, 740],
  [390, 900],
  [1440, 740],
  [1440, 900],
]) {
  test(`${width}×${height}px에서 인트로는 화면에 맞춰 커지고 크기를 유지하며 다음 섹션으로 이어짐`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.setViewportSize({ width, height });
    await page.goto("/");
    const hero = page.locator("#intro");
    const stage = hero.locator(".hero-stage");
    const copy = hero.locator(".hero-copy");
    await expect(hero).toHaveAttribute("data-scroll-scene", "true");
    await expect(stage).toHaveCSS("position", "sticky");
    const range = await hero.evaluate((element) => ({
      start: element.getBoundingClientRect().top + window.scrollY,
      distance: element.getBoundingClientRect().height - window.innerHeight,
    }));
    expect(range.distance).toBeGreaterThan(0);
    const scale = () =>
      copy.evaluate(
        (element) =>
          new DOMMatrixReadOnly(getComputedStyle(element).transform).m11,
      );
    let previousScale = 1;
    for (const progress of [0, 0.2, 0.4, 0.6, 0.8, 1]) {
      await page.evaluate(
        (top) => window.scrollTo({ top, behavior: "instant" }),
        range.start + range.distance * progress,
      );
      await page.evaluate(
        () =>
          new Promise<void>((resolve) => {
            requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
          }),
      );
      if (progress === 0) await expect.poll(scale).toBeCloseTo(1, 2);
      else {
        await expect.poll(scale).toBeGreaterThanOrEqual(previousScale - 0.001);
      }
      previousScale = await scale();
      expect(previousScale).toBeLessThanOrEqual(1.501);
      await expectNoHorizontalOverflow(page);
    }
    if (width === 320) expect(previousScale).toBeGreaterThanOrEqual(1);
    else expect(previousScale).toBeGreaterThan(width === 390 ? 1.05 : 1.3);
    const copyBounds = await copy.boundingBox();
    expect(copyBounds).not.toBeNull();
    expect(copyBounds!.x).toBeGreaterThanOrEqual(0);
    expect(copyBounds!.x + copyBounds!.width).toBeLessThanOrEqual(width);
    expect(copyBounds!.y).toBeGreaterThanOrEqual(width < 768 ? 72 : 80);
    expect(copyBounds!.y + copyBounds!.height).toBeLessThanOrEqual(height);
    const stageTop = await stage.evaluate(
      (element) => element.getBoundingClientRect().top,
    );
    await page.mouse.wheel(0, 300);
    await expect
      .poll(() =>
        stage.evaluate((element) => element.getBoundingClientRect().top),
      )
      .toBeLessThan(stageTop - 100);
    await expect(page.locator("#impact")).toBeInViewport();
    await expect.poll(scale).toBeCloseTo(previousScale, 3);
    await expectNoHorizontalOverflow(page);
  });
}

for (const width of [390, 1440]) {
  test(`${width}px에서 역량 장면은 세로 입력을 가로 이동과 줌으로 연결함`, async ({
    page,
  }, testInfo) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    const runway = page.locator(".capability-runway");
    const viewport = runway.locator(".capability-viewport");
    const cards = runway.locator(".capability-card");
    await expect(runway).toHaveAttribute("data-scroll-scene", "true");
    await expect(viewport).toHaveCSS("position", "sticky");
    await expect(cards).toHaveCount(3);
    const range = await runway.evaluate((element) => ({
      start: element.getBoundingClientRect().top + window.scrollY,
      distance: element.getBoundingClientRect().height - window.innerHeight,
    }));
    expect(range.distance).toBeGreaterThan(0);
    const scales: number[] = [];
    for (const [index, progress] of [
      [0, 0],
      [1, 0.5],
      [2, 1],
    ]) {
      await page.evaluate(
        (top) => window.scrollTo({ top, behavior: "instant" }),
        range.start + range.distance * progress,
      );
      await expectCapabilityPanelVisible(cards.nth(index));
      scales.push(
        await cards
          .first()
          .evaluate(
            (element) =>
              new DOMMatrixReadOnly(getComputedStyle(element).transform).m11,
          ),
      );
      await expect(viewport).toHaveJSProperty("scrollLeft", 0);
      await expectNoHorizontalOverflow(page);
      if (progress === 0.5) {
        const top = await viewport.evaluate(
          (element) => element.getBoundingClientRect().top,
        );
        expect(top).toBeCloseTo(width < 1024 ? 92 : 104, 0);
        await captureScreen(page, `${width}-capability-pan`, testInfo, false);
      }
    }
    expect(Math.max(...scales) - Math.min(...scales)).toBeGreaterThan(0.04);
    await expect(cards.last().locator("h3")).toBeInViewport();
  });

  test(`${width}px에서 가로 역량 장면을 키보드로 탐색해도 포커스와 내부 스크롤이 안정적임`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    const runway = page.locator(".capability-runway");
    await expect(runway).toHaveAttribute("data-scroll-scene", "true");
    const links = runway.locator("a");
    const viewport = runway.locator(".capability-viewport");
    await links.last().focus();
    for (const [index, nextKey] of [
      [2, "Shift+Tab"],
      [1, "Shift+Tab"],
      [0, "Tab"],
      [1, "Tab"],
      [2, null],
    ] as const) {
      const link = links.nth(index);
      await expectVisibleFocus(link);
      await expect
        .poll(() =>
          link.evaluate((element) => {
            const rect = element.getBoundingClientRect();
            const hit = document.elementFromPoint(
              rect.x + rect.width / 2,
              rect.y + rect.height / 2,
            );
            return element === hit || element.contains(hit);
          }),
        )
        .toBe(true);
      await expect(viewport).toHaveJSProperty("scrollLeft", 0);
      await expectNoHorizontalOverflow(page);
      if (nextKey) await page.keyboard.press(nextKey);
    }
    const contrast = await links.last().evaluate((element) => {
      const card = element.closest(".capability-card");
      if (!card) throw new Error("역량 패널이 없음");
      const luminance = (color: string) => {
        const channels = (color.match(/[\d.]+/g) ?? [])
          .slice(0, 3)
          .map(Number)
          .map((value) => {
            const normalized = value / 255;
            return normalized <= 0.04045
              ? normalized / 12.92
              : ((normalized + 0.055) / 1.055) ** 2.4;
          });
        return (
          channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
        );
      };
      const foreground = luminance(getComputedStyle(element).outlineColor);
      const background = luminance(getComputedStyle(card).backgroundColor);
      return (
        (Math.max(foreground, background) + 0.05) /
        (Math.min(foreground, background) + 0.05)
      );
    });
    expect(contrast).toBeGreaterThanOrEqual(3);
  });
}

for (const scenario of [
  {
    name: "창 폭을 줄여도",
    initial: { width: 1440, height: 1000 },
    next: { width: 390, height: 1000 },
    index: 1,
    reducedMotion: "no-preference",
    enhanced: "true",
  },
  {
    name: "낮은 창으로 전환해도",
    initial: { width: 390, height: 844 },
    next: { width: 390, height: 640 },
    index: 2,
    reducedMotion: "no-preference",
    enhanced: "false",
  },
  {
    name: "동작 줄이기를 전환해도",
    initial: { width: 390, height: 844 },
    next: { width: 390, height: 844 },
    index: 2,
    reducedMotion: "reduce",
    enhanced: "false",
  },
] as const) {
  test(`역량 링크 포커스는 ${scenario.name} 화면에 보존됨`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.setViewportSize(scenario.initial);
    await page.goto("/");
    const runway = page.locator(".capability-runway");
    const card = runway.locator(".capability-card").nth(scenario.index);
    const link = card.locator("a");
    await expect(runway).toHaveAttribute("data-scroll-scene", "true");
    await link.focus();
    await expectCapabilityPanelVisible(card);

    await page.setViewportSize(scenario.next);
    await page.emulateMedia({ reducedMotion: scenario.reducedMotion });
    await expect(runway).toHaveAttribute(
      "data-scroll-scene",
      scenario.enhanced,
    );
    await expectVisibleFocus(link);
    await expect(link).toBeInViewport({ ratio: 1 });
    await expect
      .poll(() =>
        link.evaluate((element) => {
          const bounds = element.getBoundingClientRect();
          const hit = document.elementFromPoint(
            bounds.left + bounds.width / 2,
            bounds.top + bounds.height / 2,
          );
          return element === hit || element.contains(hit);
        }),
      )
      .toBe(true);
    await expectNoHorizontalOverflow(page);

    await page.setViewportSize(scenario.initial);
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await expect(runway).toHaveAttribute("data-scroll-scene", "true");
    await expectVisibleFocus(link);
    await expectCapabilityPanelVisible(card);
    await expect(runway.locator(".capability-viewport")).toHaveJSProperty(
      "scrollLeft",
      0,
    );
  });
}

for (const transition of ["창 폭", "동작 줄이기"] as const) {
  test(`역량을 벗어난 뒤 ${transition} 변경은 현재 읽는 섹션을 유지함`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");
    const card = page.locator(".capability-card").nth(1);
    const link = card.locator("a");
    await link.focus();
    await expectCapabilityPanelVisible(card);
    const contact = page.locator("#contact h2");
    await contact.evaluate((element) =>
      element.scrollIntoView({ block: "start", behavior: "instant" }),
    );
    await expect(contact).toBeInViewport({ ratio: 1 });
    await expect(
      page.locator('.desktop-nav a[href="/#contact"]'),
    ).toHaveAttribute("aria-current", "location");

    if (transition === "창 폭") {
      await page.setViewportSize({ width: 1400, height: 1000 });
    } else {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await expect(page.locator(".capability-runway")).toHaveAttribute(
        "data-scroll-scene",
        "false",
      );
    }
    await expect(link).toBeFocused();
    await expect(contact).toBeInViewport({ ratio: 1 });
  });
}

test("인라인 상세로 본문이 좁아져도 가로 장면의 너비와 끝 위치를 다시 계산함", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const runway = page.locator(".capability-runway");
  const viewport = runway.locator(".capability-viewport");
  await expect(runway).toHaveAttribute("data-scroll-scene", "true");
  const fullWidth = await viewport.evaluate((element) => element.clientWidth);
  await runway.locator('a[href="/work/officener-web"]').click();
  const detail = await expectInlineDetail(page, "officener-web");
  await expect
    .poll(() => viewport.evaluate((element) => element.clientWidth))
    .toBeLessThan(fullWidth * 0.8);
  await expect
    .poll(() =>
      viewport.evaluate((element) =>
        Math.abs(element.getBoundingClientRect().width - element.clientWidth),
      ),
    )
    .toBeLessThanOrEqual(1);
  await expect(runway).toHaveAttribute("data-scroll-scene", "true");
  await page.mouse.wheel(0, 1);
  const end = await runway.evaluate(
    (element) =>
      element.getBoundingClientRect().bottom +
      window.scrollY -
      window.innerHeight,
  );
  await page.evaluate(
    (top) => window.scrollTo({ top, behavior: "instant" }),
    end,
  );
  await expectCapabilityPanelVisible(runway.locator(".capability-card").last());
  await expect(viewport).toHaveJSProperty("scrollLeft", 0);
  await expectNoHorizontalOverflow(page);
  await detail.getByRole("link", { name: "상세 닫기", exact: true }).click();
  await expect
    .poll(() => viewport.evaluate((element) => element.clientWidth))
    .toBe(fullWidth);
  await expectNoHorizontalOverflow(page);
});

test("낮은 화면에서는 큰 스크롤 장면을 세로 본문으로 제공함", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 640 });
  await page.goto("/");
  await expect(page.locator(".hero-stage")).not.toHaveCSS("position", "sticky");
  await expect(page.locator(".hero-copy")).toHaveCSS("transform", "none");
  const runway = page.locator(".capability-runway");
  await expect(runway).toHaveAttribute("data-scroll-scene", "false");
  await expect(runway.locator(".capability-viewport")).not.toHaveCSS(
    "position",
    "sticky",
  );
  await expect(runway.locator(".capability-track")).toHaveCSS(
    "transform",
    "none",
  );
  for (const card of await runway.locator(".capability-card").all()) {
    await card.locator("a").scrollIntoViewIfNeeded();
    await expect(card.locator("a")).toBeInViewport();
    await expect(card).toHaveCSS("transform", "none");
  }
  await expectNoHorizontalOverflow(page);
});

for (const reducedMotion of ["no-preference", "reduce"] as const) {
  test(`${reducedMotion} 설정에 맞춰 작업 호버와 CTA 자력이 움직이거나 정지함`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion });
    await page.goto("/");
    const target = page.locator(".magnetic-target");
    const bounds = await target.boundingBox();
    if (!bounds) throw new Error("CTA 위치가 없음");
    await page.mouse.move(bounds.x + bounds.width - 12, bounds.y + 12);
    if (reducedMotion === "no-preference") {
      await expect
        .poll(() =>
          target.evaluate((element) =>
            Math.abs(
              new DOMMatrixReadOnly(getComputedStyle(element).transform).m41,
            ),
          ),
        )
        .toBeGreaterThan(2);
    } else {
      await expect(target).toHaveCSS("transform", "none");
    }
    await page.locator("#work").scrollIntoViewIfNeeded();
    const frame = page.locator(".work-tilt-frame").first();
    await frame.scrollIntoViewIfNeeded();
    const card = await frame.boundingBox();
    if (!card) throw new Error("작업 카드 위치가 없음");
    await page.mouse.move(card.x + card.width - 30, card.y + 100);
    const tilt = frame.locator(".work-tilt");
    if (reducedMotion === "no-preference") {
      await expect
        .poll(() =>
          tilt.evaluate((element) =>
            Math.abs(
              new DOMMatrixReadOnly(getComputedStyle(element).transform).m13,
            ),
          ),
        )
        .toBeGreaterThan(0.01);
    } else {
      await expect(tilt).toHaveCSS("transform", "none");
    }
    await page.mouse.move(0, 0);
    await expect
      .poll(() =>
        tilt.evaluate((element) =>
          Math.abs(
            new DOMMatrixReadOnly(getComputedStyle(element).transform).m13,
          ),
        ),
      )
      .toBeLessThan(0.001);
    await expectNoHorizontalOverflow(page);
  });
}

test("시스템 동작 줄이기 설정에서 지속되는 모션과 부드러운 스크롤이 없음", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const motion = await page.evaluate(() => {
    const elements = [...document.querySelectorAll<HTMLElement>("body *")];
    const durationSeconds = (durations: string) =>
      durations.split(",").map((duration) => {
        const value = Number.parseFloat(duration);
        return duration.trim().endsWith("ms") ? value / 1000 : value;
      });
    return {
      smoothScroll: getComputedStyle(document.documentElement).scrollBehavior,
      animated: elements
        .filter((element) => {
          const style = getComputedStyle(element);
          return (
            (style.animationName !== "none" &&
              durationSeconds(style.animationDuration).some(
                (duration) => duration > 0.01,
              )) ||
            (style.transitionProperty !== "none" &&
              durationSeconds(style.transitionDuration).some(
                (duration) => duration > 0.01,
              ))
          );
        })
        .map((element) => element.className),
    };
  });
  expect(motion.smoothScroll).not.toBe("smooth");
  expect(motion.animated).toEqual([]);
  const panels = page.locator(
    ".hero-copy, .impact-word, .impact-board, .capability-track, .capability-card",
  );
  const initial = await panels.evaluateAll((elements) =>
    elements.map((element) => getComputedStyle(element).transform),
  );
  await page.locator("#capabilities").scrollIntoViewIfNeeded();
  const final = await panels.evaluateAll((elements) =>
    elements.map((element) => getComputedStyle(element).transform),
  );
  expect(final).toEqual(initial);
  expect(
    await panels.evaluateAll((elements) =>
      elements.every(
        (element) =>
          new DOMMatrixReadOnly(getComputedStyle(element).transform).isIdentity,
      ),
    ),
  ).toBe(true);
  await expect(page.locator(".capability-runway")).toHaveAttribute(
    "data-scroll-scene",
    "false",
  );
  await expect(page.locator(".capability-viewport")).not.toHaveCSS(
    "position",
    "sticky",
  );
  await expect(page.locator(".hero-stage")).not.toHaveCSS("position", "sticky");
  await page
    .getByRole("button", { name: "업데이트·운영", exact: true })
    .click();
  await page.locator('#work a[href="/work/app-release"]').click();
  const detail = await expectInlineDetail(page, "app-release");
  await expectProjectImpact(detail, "app-release");
  expect(
    await page.evaluate(
      () =>
        document
          .getAnimations()
          .filter((animation) => animation.playState === "running").length,
    ),
  ).toBe(0);
});

for (const width of [390, 1440]) {
  test(`${width}px 주요 화면에 심각한 자동 접근성 위반이 없음`, async ({
    page,
  }, testInfo) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/",
      ...projects.map((slug) => `/work/${slug}`),
      missingPage,
    ]) {
      await page.goto(path);
      await loadAllImages(page);
      await expectAccessible(page, `${width}px ${path}`, testInfo);
    }
    await page.goto("/");
    await page
      .locator("#career summary")
      .filter({ hasText: "코스 프로젝트 보기" })
      .click();
    await loadAllImages(page);
    await expectAccessible(page, `${width}px 기존 프로젝트 펼치기`, testInfo);
    await page.goto("/#work");
    await page.locator('#work a[href="/work/officener-app"]').click();
    await expectInlineDetail(page, "officener-app");
    await expectAccessible(page, `${width}px 메인과 사례 상세`, testInfo);
    if (width === 390) {
      await page.goto("/");
      await page
        .getByRole("button", { name: "메뉴 열기", exact: true })
        .click();
      await expectAccessible(page, "모바일 메뉴", testInfo);
    }
  });
}
