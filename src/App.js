import './App.css';
import RegistrationForm from './screens/authentication/RegistrationForm';
import Screens from './screens';
import AppProvider from './providers/AppProvider'
import NavBar from '../src/components/NavBar'

function App() {
  return (
    <AppProvider>
      <NavBar/>
      <Screens/>
    </AppProvider>
  );
}

export default App;
