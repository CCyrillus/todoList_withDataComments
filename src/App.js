
import './App.css';
import SideNavigation from "./components/SideNav/index.js";
import ItemComponent from './components/ItemComponent';

function App() {

  return (
    <div className="react-app container-fluid">
      <div className="row">

        <SideNavigation />

        <ItemComponent />

      </div>
    </div>
  );
}

export default App;
