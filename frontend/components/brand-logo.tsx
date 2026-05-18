import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  height?: number;
  showWordmark?: boolean;
  className?: string;
  subLabel?: string;
  variant?: "nav" | "sidebar" | "compact";
  onClick?: () => void;
};

export function BrandLogo({
  href,
  height = 42,
  showWordmark = true,
  className,
  subLabel = "Alışveriş Asistanı",
  variant = "nav",
  onClick,
}: BrandLogoProps) {
  const rootClass =
    className ??
    (variant === "sidebar" ? "sidebar-logo" : variant === "compact" ? "card-logo" : "nav-logo");

  const wordmark =
    variant === "sidebar" ? (
      <span className="sidebar-logo-name">CrowGuard</span>
    ) : variant === "compact" ? (
      <span className="card-logo-name">CrowGuard</span>
    ) : showWordmark ? (
      <div className="nav-logo-wrap">
        <span className="nav-logo-name">CrowGuard</span>
        <span className="nav-logo-sub">{subLabel}</span>
      </div>
    ) : null;

  const content = (
    <>
      <Image
        src="/logo.png"
        alt="CrowGuard"
        width={height}
        height={height}
        priority
        unoptimized
        style={{ height, width: "auto" }}
        className="shrink-0"
      />
      {wordmark}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={rootClass} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return <div className={rootClass}>{content}</div>;
}
