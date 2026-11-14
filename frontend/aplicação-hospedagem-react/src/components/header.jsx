
import Logo from './logo';
import SearchBar from './searchBar';
import AuthLinks from './authLinks';
import MainNav from './maiNave';
import CartIcon from './cartIcon'; 

const Header = () => {
  return (
    <header className="w-full border-b border-gray-200 bg-white p-4 md:p-6 flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0">
        <Logo />
        <SearchBar />
        <div className="flex items-center gap-4">
          <AuthLinks />
          <CartIcon />
        </div>
      </div>
      <MainNav />
    </header>
  );
};

export default Header;