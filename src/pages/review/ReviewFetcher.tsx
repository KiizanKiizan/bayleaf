import { Loader } from "semantic-ui-react";
import { TCoordinateResponse } from "../../api/coordinates/TCoordinateResponse";
import { useCoordinateIndex } from "../../api/coordinates/useCoordinateIndex";
import { useReviewOptionIndex } from "../../api/reviews/useReviewOptionIndex";
import { Typography } from "../../components/baseParts/Typography";
import { ErrorMessage } from "../../components/shared/ErrorMessage";
import { ReviewContainer } from "./ReviewContainer";

type TProps = {
  readonly coordinates: TCoordinateResponse[];
};

export const ReviewFetcher = ({ coordinates }: TProps) => {
  const { data: reviewOptionData, error: reviewOptionError } =
    useReviewOptionIndex();

  if (reviewOptionError)
    return <ErrorMessage message={reviewOptionError.message} />;

  if (!coordinates || !reviewOptionData) return <Loader active />;

  return (
    <ReviewContainer
      coordinateResponses={coordinates}
      reviewOptionResponses={reviewOptionData.options}
      reviewReasonOptionResponses={reviewOptionData.reasonOptions}
    />
  );
};
