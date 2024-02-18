import Navbar from './components/Navbar';
import Auth from './components/Auth';
import Home from './components/Home';
import { useCookies } from 'react-cookie';

function App() {

  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.authToken;

  return (
    <>
    { !authToken && <Auth /> }
    { authToken &&
      <>
        <Navbar />
        <Home />
      </> }
  </>
  );

}

export default App;