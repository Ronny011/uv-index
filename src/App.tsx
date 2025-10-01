import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Page } from './App.styles';
import { UvCard } from './UvCard';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Page>
        <UvCard />
      </Page>
    </QueryClientProvider>
  );
}

export default App;
