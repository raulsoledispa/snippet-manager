const Layout = ({ children }) => {
  return (
    <>
      <main className="mx-auto w-full max-w-[80rem] bg-transparent">
        {children}
      </main>
    </>
  );
};

export default Layout;
