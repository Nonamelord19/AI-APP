import Link from "next/link";
import { getLang, t } from "@/lib/i18n";
import { quests } from "@/lib/quests";

const labels = {
  title: {
    uk: "Квести",
    en: "Quests",
    ru: "Квесты"
  },
  subtitle: {
    uk: "Оберіть квест та відкрийте деталі.",
    en: "Choose a quest and open details.",
    ru: "Выберите квест и откройте детали."
  }
};

export default function DemoPage({
  searchParams
}: {
  searchParams: { lang?: string };
}) {
  const lang = getLang(searchParams.lang);

  return (
    <main className="container stack">
      <section className="card stack">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div>
            <h1 style={{ margin: "0 0 8px" }}>{t(labels.title, lang)}</h1>
            <p className="muted" style={{ margin: 0 }}>
              {t(labels.subtitle, lang)}
            </p>
          </div>
          <LangSwitcher currentLang={lang} />
        </div>
      </section>

      <section className="questList">
        {quests.map((quest) => (
          <article key={quest.id} className="card stack">
            <h2 style={{ margin: 0 }}>{quest.title[lang]}</h2>
            <p className="muted" style={{ margin: 0 }}>{quest.result[lang]}</p>
            <div>
              <Link href={`/demo/quests/${quest.id}?lang=${lang}`} className="button">
                Open
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

function LangSwitcher({ currentLang }: { currentLang: string }) {
  const langs = ["uk", "en", "ru"];
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {langs.map((lang) => (
        <Link
          key={lang}
          href={`/demo?lang=${lang}`}
          className="button"
          style={{ opacity: currentLang === lang ? 1 : 0.65 }}
        >
          {lang.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
