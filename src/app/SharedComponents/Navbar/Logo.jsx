import Link from 'next/link';

const Logo = ({ pacifico }) => {
    return (
        <Link href={'/'} className={`cursor-pointer hover:bg-black hover:bg-opacity-5 px-3 rounded-lg text-lg sm:text-xl text-white ${pacifico.className}`}>
            Classy Touch
        </Link>
    );
};

export default Logo;
