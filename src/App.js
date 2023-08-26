import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Login from './components/public/Login';
import Register from './components/public/Register';
import Layout from './components/layout/Layout';
import DisplaySingleUser from './components/users/DisplaySingleUser';
import EditUser from './components/users/EditUser';
function App() {
  const router = createBrowserRouter(
    [
      {
        element: <AppLayout />,
        children: [
          {
            path: '/',
            element: <Login />
          },
          {
            path: '/login',
            element: <Login />
          },
          {
            path: '/register',
            element: <Register />
          },
          {
            path: '/dash',
            element: <Layout />,
            children: [
              {
                path: 'users',
                children: [
                  {
                    path: 'display-user/:userID',
                    element: <DisplaySingleUser />
                  },
                  {
                    path: 'edit-user/:userID',
                    element: <EditUser />
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  )
  return (
    <div className="App">
      <RouterProvider router = {router} />
    </div>
  );
}

export default App;
