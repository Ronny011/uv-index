import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ContentWrapper, Page } from './App.styles';
import { UvCard } from 'components/UvCard';
import { Navigator } from 'components/Navigator';
import { useState } from 'react';
import { AddSettlement } from 'components/AddSettlement';
import { ChangeSettlement } from 'components/ChangeSettlement';

export type CardMode = 'changeSettlement' | 'addSettlement' | 'uv';

const cardModeToComponent: Record<CardMode, () => React.JSX.Element> = {
  addSettlement: AddSettlement,
  changeSettlement: ChangeSettlement,
  uv: UvCard
};

const queryClient = new QueryClient();

function App() {
  const [cardMode, setCardMode] = useState<CardMode>('uv');
  const Component = cardModeToComponent[cardMode];

  const handleModeChange = (mode: CardMode) => setCardMode(mode);

  return (
    <QueryClientProvider client={queryClient}>
      <Page>
        <Navigator onNavigate={handleModeChange} />
        <ContentWrapper>
          <Component />
        </ContentWrapper>
      </Page>
    </QueryClientProvider>
  );
}

export default App;
