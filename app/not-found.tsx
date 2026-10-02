import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found shell">
      <Link
        href="/"
        className="not-found__brand"
        aria-label="DEAN 이정민 홈으로 이동"
      >
        DEAN<span aria-hidden="true">.</span>
      </Link>
      <div className="not-found__code" aria-hidden="true">
        404
      </div>
      <p className="eyebrow">요청한 페이지를 찾을 수 없음</p>
      <h1 className="not-found__title">이 페이지는 여기 없어요.</h1>
      <p className="not-found__description">
        주소가 바뀌었거나 존재하지 않는 페이지예요.
        <br />
        처음으로 돌아가거나 진행한 작업을 살펴보세요.
      </p>
      <div className="not-found__actions">
        <Link href="/" className="button button--dark">
          처음으로 돌아가기
        </Link>
        <Link href="/#work" className="text-link">
          작업 보기
        </Link>
      </div>
    </main>
  );
}
