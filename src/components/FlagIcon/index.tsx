interface FlagIconProps {
  isoCode: 'fr' | 'en';
  alt?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
}

export const FlagIcon = ({ isoCode, alt, width, height, className }: FlagIconProps) => (
  <img
    alt={alt}
    className={className}
    width={width}
    height={height}
    src={`https://flagicons.lipis.dev/flags/4x3/${isoCode === 'en' ? 'gb' : isoCode}.svg`}
  />
);
