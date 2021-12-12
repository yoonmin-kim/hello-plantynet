import LoginForm from '../routes/LoginForm';
import RegisterForm from '../routes/RegisterForm';
import Home from '../routes/Home';
import AddForm from '../routes/AddForm';
import List from '../routes/List';
import EditList from '../routes/EditList';
import DeleteList from '../routes/DeleteList';
import EditForm from '../routes/EditForm';
import { Navigate } from 'react-router-dom';

const routes = (isLoggedIn) => [
  {
    path: '/user/login', 
    element: <LoginForm />,
  },
  {
    path: '/user/register', 
    element: <RegisterForm />,
  },
  {
    path: '/', 
    element: isLoggedIn ? <Home /> : <Navigate to="/user/login" />,
  },
  {
    path: '/add', 
    element: isLoggedIn ? <AddForm /> : <Navigate to="/user/login" />,
  },
  {
    path: '/list', 
    element: isLoggedIn ? <List /> : <Navigate to="/user/login" />,
  },
  {
    path: '/editList', 
    element: isLoggedIn ? <EditList /> : <Navigate to="/user/login" />,
  },
  {
    path: '/editForm/:id', 
    element: isLoggedIn ? <EditForm /> : <Navigate to="/user/login" />,
  },
  {
    path: '/deleteList', 
    element: isLoggedIn ? <DeleteList /> : <Navigate to="/user/login" />,
  },

];

export default routes;