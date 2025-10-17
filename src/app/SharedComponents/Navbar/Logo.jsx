import Image from "next/image";
import Link from "next/link";
import logoImage from "../../../../Logo.png";

const Logo = ({ pacifico }) => {
  return (
    <Link
      href="/"
      className={`cursor-pointer py-2 hover:scale-110 transition-all duration-200 ${pacifico.className}`}
    >
      {/* Tablet */}
      <span className="block md:hidden">
        <Image src={logoImage} alt="Logo" width={80} height={40} priority />
      </span>

      {/* Desktop */}
      <span className="hidden md:block">
        <Image src={logoImage} alt="Logo" width={120} height={80} priority />
      </span>
    </Link>
  );
};

export default Logo;
