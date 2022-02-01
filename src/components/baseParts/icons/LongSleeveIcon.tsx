type Props = {
  className?: string;
};

export const LongSleeveIcon = ({ className }: Props) => {
  return (
    <svg
      width="60"
      height="39"
      viewBox="0 0 60 39"
      className={`${className ?? ""} stroke-current fill-inherit`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16.4986 3.83338C19.2515 2.57948 24.7526 1.55552 24.7526 1.55552C24.7526 1.55552 25.9104 6.52097 30.4911 6.52097C35.0719 6.52097 36.3807 1.55552 36.3807 1.55552C36.3807 1.55552 39.2751 0.949059 43.8306 2.80942C48.3862 4.66979 58.6362 27.2222 58.6362 27.2222L52.9418 30.6389L43.8306 12.64C42.0185 32.8027 45.3911 33.6554 45.3911 37.1161C45.3911 39.7002 37.2197 35.6827 21.6629 36.813C20.6438 36.9271 19.5621 37.0294 18.4101 37.1161C15.9939 26.6837 19.2155 22.1195 17.504 12.64L7.38958 30.0279L1.69434 26.6112C1.69434 26.6112 10.3701 6.62489 16.4986 3.83338Z" />
      <path
        d="M18.4101 37.1161C15.9939 26.6837 19.2155 22.1195 17.504 12.64L7.38958 30.0279L1.69434 26.6112C1.69434 26.6112 10.3701 6.62489 16.4986 3.83338C19.2515 2.57948 24.7526 1.55552 24.7526 1.55552C24.7526 1.55552 25.9104 6.52097 30.4911 6.52097C35.0719 6.52097 36.3807 1.55552 36.3807 1.55552C36.3807 1.55552 39.2751 0.949059 43.8306 2.80942C48.3862 4.66979 58.6362 27.2222 58.6362 27.2222L52.9418 30.6389L43.8306 12.64C42.0185 32.8027 45.3911 33.6554 45.3911 37.1161M18.4101 37.1161C36.0786 35.1099 45.3911 39.8747 45.3911 37.1161M18.4101 37.1161C29.7361 36.2635 34.2665 33.9061 39.2499 33.6554C44.2333 33.4046 45.3911 35.461 45.3911 37.1161"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};
