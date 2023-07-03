import { useGetIdentity } from "react-admin";
import { useCollection } from "@semapps/activitypub-components";

const GROUP_URI = process.env.REACT_APP_AGGREGATOR_BASE_URL + '/actors/syreen';

const useSyreenGroupMember = () => {
  const { identity } = useGetIdentity();
  const { items, loaded } = useCollection(GROUP_URI + '/followers');
  const isMember = !!(identity && loaded && items.includes(identity.id));
  return { isMember, loaded };
};

export default useSyreenGroupMember;
