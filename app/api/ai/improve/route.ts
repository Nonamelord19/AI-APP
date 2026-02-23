import OpenAI from "openai";
import { NextResponse } from "next/server";
import { getLang, type Lang } from "@/lib/i18n";

type ImproveRequest = {
  text?: string;
  lang?: string;
};

const systemByLang: Record<Lang, string> = {
  uk: "Ти редактор українських/міжнародних текстів. Покращ текст користувача і поверни JSON з improvedText та reasons[].",
  en: "You are a writing editor. Improve the user's text and return JSON with improvedText and reasons[].",
  ru: "Ты редактор текстов. Улучши текст пользователя и верни JSON с improvedText и reasons[]."
};

const demoReasonsByLang: Record<Lang, string[]> = {
  uk: ["Спростив формулювання", "Покращив структуру речень", "Зробив тон більш дружнім"],
  en: ["Simplified wording", "Improved sentence flow", "Made the tone friendlier"],
  ru: ["Упростил формулировки", "Улучшил структуру предложений", "Сделал тон более дружелюбным"]
};

export async function POST(request: Request) {
  const body = (await request.json()) as ImproveRequest;
  const text = body.text?.trim();
  const lang = getLang(body.lang);

  if (!text) {
    return NextResponse.json({ error: "Missing text" }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    const improvedText = demoImprove(text, lang);
    return NextResponse.json({ improvedText, reasons: demoReasonsByLang[lang] });
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        { role: "system", content: systemByLang[lang] },
        {
          role: "user",
          content:
            `${text}\n\nReturn strict JSON only in this schema: {"improvedText": string, "reasons": string[]}. ` +
            `Write all fields in language: ${lang}.`
        }
      ]
    });

    const raw = response.output_text;
    const parsed = JSON.parse(raw) as { improvedText: string; reasons: string[] };

    return NextResponse.json({
      improvedText: parsed.improvedText,
      reasons: Array.isArray(parsed.reasons) ? parsed.reasons : []
    });
  } catch {
    const improvedText = demoImprove(text, lang);
    return NextResponse.json({ improvedText, reasons: demoReasonsByLang[lang] });
  }
}

function demoImprove(text: string, lang: Lang): string {
  const endings: Record<Lang, string> = {
    uk: "\n\n(Демо-режим: приклад покращеної версії)",
    en: "\n\n(Demo mode: sample improved version)",
    ru: "\n\n(Демо-режим: пример улучшенной версии)"
  };

  return text
    .replace(/\s+/g, " ")
    .replace(/\bi\b/gi, "I")
    .trim() + endings[lang];
}
