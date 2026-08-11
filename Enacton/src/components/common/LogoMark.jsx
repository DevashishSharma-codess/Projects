export const LogoMark = ({ size = 24, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      className={`inline-block shrink-0 ${className}`}
      aria-hidden="true"
    >
      <circle cx="18" cy="4" r="2.8" fill="currentColor" />
      <circle cx="25" cy="11" r="2.8" fill="currentColor" />
      <circle cx="32" cy="18" r="2.8" fill="currentColor" />
      <circle cx="25" cy="25" r="2.8" fill="currentColor" />
      <circle cx="18" cy="32" r="2.8" fill="currentColor" />
      <circle cx="11" cy="25" r="2.8" fill="currentColor" />
      <circle cx="4" cy="18" r="2.8" fill="currentColor" />
      <circle cx="11" cy="11" r="2.8" fill="currentColor" />
    </svg>
  );
};
