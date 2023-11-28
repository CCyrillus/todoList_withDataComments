
import './App.css';
import SideNavigation from "./components/SideNav/index.js";
import ItemComponent from './components/ItemComponent';
import { HashRouter } from 'react-router-dom';

function App() {

  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <div className="react-app container-fluid">
        <div className="row">

          <SideNavigation />

          <ItemComponent />

        </div>
      </div>
    </HashRouter>

  );
}

export default App;
