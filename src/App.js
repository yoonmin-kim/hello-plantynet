import 'bootstrap/dist/css/bootstrap.css';
import { useDispatch, useSelector } from 'react-redux';
import { useRoutes, useNavigate } from 'react-router';
import routes from './services/routes';
import * as service from "./services/reactController";
import { useEffect } from 'react';

const App = () => {
    const loggedIn = useSelector((state) => state);
    const routing = useRoutes(routes(loggedIn));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const myBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
      localStorage.setItem("redirectUrl", window.location.pathname);
      console.log('testtest');
    };

    useEffect(async () => {
      const res = await service.get('http://localhost:8080/api/regions');
      if (res.result === 'error') {
        dispatch({type: '로그인실패'});
      } else {
        dispatch({type: '로그인성공'});
        navigate(localStorage.getItem("redirectUrl"));
      }

      window.addEventListener("beforeunload", myBeforeUnload);
      return () => {
        window.removeEventListener("beforeunload", myBeforeUnload);
      };
    },[]);

    return (
      <>
        {routing}
      </>
    );
}

export default App;