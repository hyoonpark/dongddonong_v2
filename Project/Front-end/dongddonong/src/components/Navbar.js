const Navbar = () => {
  return (
    <nav className="h-20 mb-4 shadow-md">
      <div className="max-w-7xl h-20 m-auto flex items-center">
        <img
          className="h-12"
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="로고"
        />
      </div>
    </nav>
  );
};

export default Navbar;
