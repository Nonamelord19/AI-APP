import questsData from "@/content/quests.v1.json";
import type { Lang } from "@/lib/i18n";

export type Quest = {
  id: string;
  title: Record<Lang, string>;
  result: Record<Lang, string>;
  prompt: Record<Lang, string>;
  rubric: Record<Lang, string>;
};

export const quests: Quest[] = questsData.quests as Quest[];

export function getQuestById(id: string): Quest | undefined {
  return quests.find((quest) => quest.id === id);
}
