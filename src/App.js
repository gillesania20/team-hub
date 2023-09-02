import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GetCookie from './components/layout/GetCookie';
import SetCookie from './components/layout/SetCookie';
import AppLayout from './components/layout/AppLayout';
import Login from './components/public/Login';
import Register from './components/public/Register';
import VerifyUser from './components/auth/VerifyUser';
import Layout from './components/layout/Layout';
import DisplaySingleUser from './components/users/DisplaySingleUser';
import EditUser from './components/users/EditUser';
import CreateTeam from './components/teams/CreateTeam';
import EditTeam from './components/teams/EditTeam';
function App() {
  const router = createBrowserRouter(
    [
      {
        element: <GetCookie />,
        children: [
          {
            element: <SetCookie />,
            children: [
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
                    element: <VerifyUser />,
                    children: [
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
                          },
                          {
                            path: 'teams',
                            children: [
                              {
                                path: 'create-team',
                                element: <CreateTeam />
                              },
                              {
                                path: 'edit-team/:teamID',
                                element: <EditTeam />
                              }
                            ]
                          }
                        ]
                      }
                    ]
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
