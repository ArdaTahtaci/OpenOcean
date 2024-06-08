import './App.css';
import Root from './routes/Root';
import { Container } from 'react-bootstrap';
import { MarketplaceContextProvider } from './context/MarketplaceContext';
import { NFTContextProvider } from './context/NFTContext';
import { WalletContextProvider } from './context/WalletContext';

function App() {
  return (
    <div className="App">
      <Container>
        <WalletContextProvider>
          <MarketplaceContextProvider>
            <NFTContextProvider>
              <Root />
            </NFTContextProvider>
          </MarketplaceContextProvider>
        </WalletContextProvider>

      </Container>
    </div>
  );
}

export default App;
