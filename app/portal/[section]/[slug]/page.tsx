import Link from "next/link";
import { notFound } from "next/navigation";

import { MarkdownBody } from "@/components/MarkdownBody";
import { BackButton } from "@/components/BackButton";
import { ShareButton } from "@/components/ShareButton";
import { ArticleContactButton } from "@/components/ArticleContactButton";
import { SECTIONS, getArticle, isSection, listArticleSlugs } from "@/lib/content";
import { SECTION_LABELS } from "@/lib/sectionLabels";
import { CATEGORIES } from "../../data";
import s from "../../portal-layout.module.css";

export async function generateStaticParams() {
  const params: { section: string; slug: string }[] = [];
  for (const section of SECTIONS) {
    const slugs = await listArticleSlugs(section);
    for (const slug of slugs) {
      params.push({ section, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;
  if (!isSection(section)) return {};
  const article = await getArticle(section, slug);
  if (!article) return {};
  return { title: article.title };
}

export default async function PortalArticlePage({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;
  if (!isSection(section)) notFound();

  const article = await getArticle(section, slug);
  if (!article) notFound();

  const label = SECTION_LABELS[section];
  const articleHref = `/portal/${section}/${slug}`;

  const parentCat = CATEGORIES.find(
    (cat) => cat.href === articleHref || cat.articles.some((a) => a.href === articleHref)
  );
  const isCategoryPage = parentCat?.href === articleHref;

  return (
    <div className={s.articleWrap}>

      {/* ── Header: breadcrumb + back + share ── */}
      <div className={s.articlePageHeader}>
        <div className={s.articleNav}>
          <BackButton />
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/portal">Home</Link>
            <span aria-hidden="true"> / </span>
            {parentCat && !isCategoryPage ? (
              <>
                <Link href={parentCat.href}>{parentCat.name}</Link>
                <span aria-hidden="true"> / </span>
                <span>{article.title}</span>
              </>
            ) : (
              <>
                <Link href="/portal">{label}</Link>
                <span aria-hidden="true"> / </span>
                <span>{article.title}</span>
              </>
            )}
          </nav>
        </div>
        <div className={s.articleTitleRow}>
          <h1 className={s.articleMainTitle}>{article.title}</h1>
          <ShareButton />
        </div>
      </div>

      {/* ── Body + right video panel ── */}
      <div className={s.articleContentRow}>
        <div className={s.articleBody}>
          <MarkdownBody>{article.bodyWithoutH1}</MarkdownBody>
        </div>

        <aside className={s.articleVideoPanel}>
          <div className={s.videoPlaceholderTile}>
            <div className={s.videoPlaceholderIcon}>▶</div>
            <span className={s.videoPlaceholderText}>WATCH VIDEO HERE</span>
          </div>
        </aside>
      </div>

      {/* ── All articles in section ── */}
      {parentCat && (
        <div className={s.relatedSection}>
          <div className={s.articleGrid}>
            {parentCat.articles.map((a) => (
              <Link key={a.href} href={a.href} className={s.articleCard}>
                <span>{a.title}</span>
                <span className={s.articleArrow}>→</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Article footer ── */}
      <div className={s.articleFooter}>
        <a
          href="https://bo.golibe.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={s.articleFooterBtnOutline}
        >
          Open Admin Console ↗
        </a>
        <ArticleContactButton />
      </div>

    </div>
  );
}


