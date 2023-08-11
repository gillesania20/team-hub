import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/public/Login';
import Register from './components/public/Register';
function App() {
  const router = createBrowserRouter(
    [
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
