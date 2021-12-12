import 'bootstrap/dist/css/bootstrap.css';
import { useRoutes } from 'react-router';
import routes from './services/routes';


const App = () => {
    const isLoggedIn = false;
    const routing = useRoutes(routes(isLoggedIn));

    return (
      <>
        {routing}
      </>
    );
}

export default App;