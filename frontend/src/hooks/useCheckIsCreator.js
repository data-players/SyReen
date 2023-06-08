import { useEffect } from 'react';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import { useRedirect, useRecordContext } from 'react-admin';

const useCheckIsCreator = message => {
  const { identity, loading } = useCheckAuthenticated();
  const redirect = useRedirect();
  const recordContext = useRecordContext();
  
  useEffect(() => {
    if (!loading && identity?.id && recordContext?.['dc:creator'] && identity.id !== recordContext['dc:creator'] ) {
      redirect('list','/offers');
    }
  }, [loading, identity, redirect, message, recordContext]);

  return { identity, loading };
};

export default useCheckIsCreator;
