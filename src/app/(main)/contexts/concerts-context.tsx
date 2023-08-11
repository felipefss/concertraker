import { ReactNode, createContext, useContext } from 'react';
import { Concert, useGetConcerts } from '../hooks/use-get-concerts';

interface ConcertsContext {
  concerts: Concert[];
}

const ConcertsContext = createContext({} as ConcertsContext);

interface Props {
  children: ReactNode;
}

export function ConcertsProvider({ children }: Props) {
  const concerts = useGetConcerts();

  return (
    <ConcertsContext.Provider
      value={{
        concerts,
      }}
    >
      {children}
    </ConcertsContext.Provider>
  );
}

export function useConcertsContext() {
  const context = useContext(ConcertsContext);

  if (!context) {
    throw new Error('No Concerts context provided!');
  }

  return context;
}
