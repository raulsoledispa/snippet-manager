

const Layout = ({children}) => {
  return (
    /*<main className="full relative overflow-x-hidden expand bg-white">*/
    <main className="max-w-[80rem] w-full mx-auto bg-transparent">
      {children}
    </main>
  )
}

export default Layout;
