import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from '@tanstack/react-query';

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      dehydrate: {
        shouldDehydrateQuery(query) {
          return (
            defaultShouldDehydrateQuery(query) ||
            query.state.status === 'pending'
          );
        },
      },
      hydrate: {},
      queries: {
        staleTime: 30 * 1000, // 30 seconds
      },
    },
  });
}
