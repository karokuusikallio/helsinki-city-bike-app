import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div>
        <Link href="/">
          <h1>Helsinki City Bike App</h1>
        </Link>
      </div>
      <nav>
        <Link href="/journeys">
          <h3>Journeys</h3>
        </Link>
        <Link href="/stations">
          <h3>Stations</h3>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
