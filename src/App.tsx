import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Page } from './App.styles';
import { UvCard } from 'components/UvCard';
// import { LocationBar } from 'components/LocationBar';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Page>
        {/* <LocationBar /> */}
        <UvCard />
      </Page>
    </QueryClientProvider>
  );
}

export default App;
