import Image from "next/image";
import Link from "next/link";

export default function ProfileMark() {
  return (
    <Link
      href="/"
      aria-label="Jaden Raats - home"
      className="profile-mark fixed left-3 top-3 z-50 h-8 w-8 overflow-hidden rounded-full border border-ink/20 bg-ink sm:left-5 sm:top-5 sm:h-10 sm:w-10"
    >
      <Image
        src="/images/jaden-portrait.png"
        alt=""
        width={40}
        height={40}
        sizes="(max-width: 639px) 32px, 40px"
        className="h-full w-full object-cover"
      />
    </Link>
  );
}
