import { useMembersIndex } from "../api/members/useMembersIndex";

export type TGAEvent = {
  readonly action: string;
  readonly category: string;
  readonly label?: string;
};

export const analyzeEvent = ({ action, category, label }: TGAEvent) => {
  const { data } = useMembersIndex();
  if (data === undefined) return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: data[0].id,
  });
};
