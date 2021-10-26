import { LoginProvider } from "./components/context/contextStateLogin";
import { ShortUrl } from "./components/input-short-url/ShortUrl";
import { Menu } from "./components/menu/Menu";
import { Working } from "./components/working/Working";
import { Statistic } from './components/statistic/Statistic';

function App() {
  return (
    <>
      <LoginProvider>
        <Menu />
        <Working />
        <ShortUrl />
        <Statistic />
      </LoginProvider>
    </>);
}

export default App;
