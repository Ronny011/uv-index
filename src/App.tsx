import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Page } from './App.styles';
import { UvCard } from 'components/UvCard';
import { Navigator } from 'components/Navigator';
import { useState } from 'react';
import { AddCity } from 'components/AddCity';
import { ChangeCity } from 'components/ChangeCity';

export type CardMode = 'changeCity' | 'addCity' | 'uv';

const cardModeToComponent: Record<CardMode, () => React.JSX.Element> = {
  addCity: AddCity,
  changeCity: ChangeCity,
  uv: UvCard
};

const queryClient = new QueryClient();

function App() {
  const [cardMode, setCardMode] = useState<CardMode>('uv');
  // const Component = cardModeToComponent[cardMode];
  const Component = cardModeToComponent.uv;

  const handleModeChange = (mode: CardMode) => setCardMode(mode);

  return (
    <QueryClientProvider client={queryClient}>
      <Page>
        {/* <Navigator onNavigate={handleModeChange} /> */}
        <Component />
      </Page>
    </QueryClientProvider>
  );
}

export default App;
