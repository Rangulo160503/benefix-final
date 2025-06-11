import Display from "./components/Display"
import Sidebar from "./components/Sidebar"


const App = () => {
  return (
    <div className="h-screen bg-white">
      <div className="h-[100%] flex">
        <Sidebar/>
        <Display/>
      </div>

    </div>
  )
}

export default App