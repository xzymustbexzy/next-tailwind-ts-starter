import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { useCollectionQuery } from '@/hooks/collection/useCollectionQuery';
import { UseQueryResult } from 'react-query';
import { ICollection } from '@/types/collection';

const CollectionContext = createContext<{
  collectionId: string;
}>({ collectionId: '' });

export const CollectionProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { collection_id: collectionId } = router.query as {
    [key: string]: string;
  };
  useEffect(() => {
    (async () => {
      if (collectionId === 'undefined') {
        await router.push('/collection');
      }
    })();
  }, [collectionId, router]);

  return (
    <CollectionContext.Provider
      value={{
        collectionId,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollectionContext = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    console.error('must use layer data in provider!');
  }
  return context;
};
