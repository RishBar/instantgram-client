import './App.css';
import RegistrationForm from './screens/authentication/RegistrationForm';
import Screens from './screens';
import AppProvider from './providers/AppProvider'

function App() {
  return (
    <AppProvider>
      <Screens/>
    </AppProvider>
  );
}

export default App;
