import './App.css'
import Path from './Component/Path'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Path />
      </QueryClientProvider>

  </div>
  )
}