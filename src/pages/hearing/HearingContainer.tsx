import { THearing } from "../../api/hearings/THearing";
import { TNotNullPlanIdMember } from "../../api/members/TMembersIndexResponse";
import { ContinuedHearingContainer } from "./ContinuedHearingContainer";
import { NewHearingContainer } from "./NewHearingContainer";

type TProps = {
  readonly member: TNotNullPlanIdMember;
  readonly hearings: THearing[];
};

export type TAnsweredForm = {
  readonly id: number;
  readonly title: string;
  readonly categoryId: number;
  readonly categoryName: string;
  readonly options: {
    id: number;
    text?: string;
    name: string;
  }[];
};
export type AnsweredHearings = {
  readonly sameCoordinateId?: number;
  readonly forms: TAnsweredForm[];
  readonly isDifferentColor?: boolean;
};

export const HearingContainer = ({ member, hearings }: TProps) => {
  if (hearings.length <= 0) {
    return (
      <NewHearingContainer
        member={member}
        nextPlanId={member.requestedPlanId ?? member.mPlanId}
      />
    );
  }

  return <ContinuedHearingContainer hearings={hearings} member={member} />;
};
