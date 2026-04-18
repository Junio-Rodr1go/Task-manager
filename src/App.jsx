import NavBar from './client/components/NavBar.jsx'
import Tasks from './client/components/tasks.jsx'
import Footer from './client/components/footer.jsx'
import SearchProvider from './client/context/search.jsx'

function App() {
  return (
    <>
      <SearchProvider>
        <NavBar />
        <Tasks />
        <Footer />
      </SearchProvider>
    </>
  )
}

export default App;