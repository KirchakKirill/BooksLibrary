import './App.css'
import Filter from "./components/filters.jsx"
import { countries, categories } from "../src/data/info.js"
import { FilterProvider } from './provider/FilterProvider.jsx'
import {SelectedContextProvider} from "./provider/SelectedProvider.jsx"
import Books from './components/listBooks.jsx'
import Logo from './components/logo.jsx'
import Info from './components/information.jsx'


function App() {

  return (
      <>
          <header>
              <h1>Books Library</h1>
              <Logo/>
          </header>
          <main>
          <FilterProvider>
          <SelectedContextProvider>
            <Filter categories = {categories} countries = {countries}/>
            <div className='setRow'>
            <Books ddd={categories}/>
            <Info/>
            </div>
          </SelectedContextProvider>
          </FilterProvider>
            
          </main>
      </>
  )
}

export default App