import Link from "next/link";
import { notFound } from "next/navigation";
import { QuestImproveForm } from "@/components/QuestImproveForm";
import { getLang, t } from "@/lib/i18n";
import { getQuestById } from "@/lib/quests";

const labels = {
  back: {
    uk: "← Назад до квестів",
    en: "← Back to quests",
    ru: "← Назад к квестам"
  },
  expectedResult: {
    uk: "Очікуваний результат",
    en: "Expected result",
    ru: "Ожидаемый результат"
  },
  prompt: {
    uk: "Підказка",
    en: "Prompt",
    ru: "Подсказка"
  },
  rubric: {
    uk: "Рубрика оцінювання",
    en: "Rubric",
    ru: "Рубрика оценки"
  }
};

export default function QuestDetailPage({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams: { lang?: string };
}) {
  const lang = getLang(searchParams.lang);
  const quest = getQuestById(params.id);

  if (!quest) notFound();

  return (
    <main className="container stack">
      <div>
        <Link href={`/demo?lang=${lang}`} className="muted" style={{ textDecoration: "none" }}>
          {t(labels.back, lang)}
        </Link>
      </div>

      <section className="card stack">
        <h1 style={{ margin: 0 }}>{quest.title[lang]}</h1>

        <div>
          <h3 style={{ margin: "0 0 6px" }}>{t(labels.expectedResult, lang)}</h3>
          <p className="muted" style={{ margin: 0 }}>{quest.result[lang]}</p>
        </div>

        <div>
          <h3 style={{ margin: "0 0 6px" }}>{t(labels.prompt, lang)}</h3>
          <p style={{ margin: 0 }}>{quest.prompt[lang]}</p>
        </div>

        <div>
          <h3 style={{ margin: "0 0 6px" }}>{t(labels.rubric, lang)}</h3>
          <p style={{ margin: 0 }}>{quest.rubric[lang]}</p>
        </div>
      </section>

      <QuestImproveForm lang={lang} />
    </main>
  );
}
