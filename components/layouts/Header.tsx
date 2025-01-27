import Link from 'next/link';

const Header = () => {
    return (
        <header className="border-b flex justify-center items-center h-14 bg-slate-200 px-4">
                <div>
                    <Link href="/">
                        Random Cat Generator
                    </Link>
                </div>
                <div>Blog</div>
                <div>Projects</div>
                <div>About</div>
                <div>Contact</div>
        </header>
    );
};

export default Header;