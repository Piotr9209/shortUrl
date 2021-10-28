import { LoginProvider } from "./components/context/contextStateLogin";
import { ShortUrl } from "./components/input-short-url/ShortUrl";
import { Menu } from "./components/menu/Menu";
import { Working } from "./components/working/Working";
import { Statistic } from './components/statistic/Statistic';
import { Footer } from './components/footer/Footer';
import './sass/App.scss';

function App() {
  return (
    <LoginProvider>
      <Menu />
      <Working />
      <ShortUrl />
      <Statistic />
      <Footer />
    </LoginProvider>
  );
}

export default App;
