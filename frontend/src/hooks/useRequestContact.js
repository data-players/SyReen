import { useGetIdentity, useNotify } from 'react-admin';
import { useOutbox, useWebfinger, ACTIVITY_TYPES } from '@semapps/activitypub-components';
import { useCallback } from 'react';

const useRequestContact = () => {
  const notify = useNotify();
  const { identity } = useGetIdentity();
  const webfinger = useWebfinger();
  const outbox = useOutbox();

  return useCallback(
    async ({ id, content }) => {
      if (!identity?.profileData?.id) {
        notify("Votre profil n'a pas été trouvé, veuillez vous déconnecter et vous reconnecter", 'error');
      } else {
        const actorUri = id.startsWith('http') ? id : await webfinger.fetch(id);
        if (actorUri) {
          await outbox.post({
            type: ACTIVITY_TYPES.OFFER,
            actor: outbox.owner,
            object: {
              type: ACTIVITY_TYPES.ADD,
              actor: actorUri,
              object: identity.profileData.id,
            },
            content,
            target: actorUri,
            to: actorUri,
          });
          notify('Demande de contact envoyée', 'success');
        } else {
          notify(`L'utilisateur ${id} n'existe pas`, 'error');
        }
      }
    },
    [webfinger, outbox, notify, identity]
  );
};

export default useRequestContact;
