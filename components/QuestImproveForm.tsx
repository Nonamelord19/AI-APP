"use client";

import { useState } from "react";
import type { Lang } from "@/lib/i18n";

type Props = {
  lang: Lang;
};

type ImproveResponse = {
  improvedText: string;
  reasons: string[];
};

const labels = {
  input: {
    uk: "Ваш текст",
    en: "Your text",
    ru: "Ваш текст"
  },
  placeholder: {
    uk: "Вставте ваш варіант відповіді...",
    en: "Paste your draft answer...",
    ru: "Вставьте ваш черновик ответа..."
  },
  button: {
    uk: "Покращити",
    en: "Improve",
    ru: "Улучшить"
  },
  loading: {
    uk: "Покращуємо...",
    en: "Improving...",
    ru: "Улучшаем..."
  },
  improved: {
    uk: "Покращений варіант",
    en: "Improved version",
    ru: "Улучшенный вариант"
  },
  reasons: {
    uk: "Що було змінено",
    en: "What was changed",
    ru: "Что было изменено"
  }
} as const;

function tr(value: Record<Lang, string>, lang: Lang) {
  return value[lang];
}

export function QuestImproveForm({ lang }: Props) {
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImproveResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImprove = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/ai/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: draft, lang })
      });

      if (!response.ok) {
        throw new Error("API error");
      }

      const data = (await response.json()) as ImproveResponse;
      setResult(data);
    } catch {
      setError("Request failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card stack">
      <label className="stack" style={{ gap: 8 }}>
        <strong>{tr(labels.input, lang)}</strong>
        <textarea
          className="textarea"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={tr(labels.placeholder, lang)}
        />
      </label>
      <div>
        <button className="button" onClick={handleImprove} disabled={!draft.trim() || loading}>
          {loading ? tr(labels.loading, lang) : tr(labels.button, lang)}
        </button>
      </div>

      {error ? <p style={{ color: "#b91c1c", margin: 0 }}>{error}</p> : null}

      {result ? (
        <div className="stack">
          <div>
            <h3 style={{ marginBottom: 8 }}>{tr(labels.improved, lang)}</h3>
            <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{result.improvedText}</p>
          </div>
          <div>
            <h3 style={{ marginBottom: 8 }}>{tr(labels.reasons, lang)}</h3>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {result.reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </section>
  );
}
