import React from 'react';
import { ShowBase, DateField, TextField } from 'react-admin';
import { useMediaQuery } from '@material-ui/core';
import { ReferenceField } from '@semapps/field-components';
import { useCheckAuthenticated } from '@semapps/auth-provider';
import MarkdownField from '../../commons/fields/MarkdownField';
import ContactField from '../../commons/fields/ContactField';
import ShowPage from '../../layout/ShowPage';
import BodyLabel from '../../commons/lists/BodyLabel';
import ShareButton from '../../commons/buttons/ShareButton';
import EditButton from '../../commons/buttons/EditButton';
import ProfileField from '../../commons/fields/ProfileField';
import BulletPointsListField from '../../commons/fields/BulletPointsListField';
import LocationField from '../../commons/fields/LocationField';
import MainList from '../../commons/lists/MainList';
import PriceField from '../../commons/fields/PriceField';
import { currencies } from '../../config/constants';
import Details from '../Details';
import Title from '../Title';
import ReturnToProjectButton from "../../commons/buttons/ReturnToProjectButton";

const Show = (props) => {
  const { identity } = useCheckAuthenticated();
  const xs = useMediaQuery((theme) => theme.breakpoints.down('xs'), { noSsr: true });
  if (!identity?.id) return null;
  return (
    <ShowBase {...props}>
      <ShowPage
        title={<Title />}
        actions={
          <>
            <ReturnToProjectButton />
            <ShareButton />
            <EditButton />
          </>
        }
        details={<Details />}
      >
        <MainList Label={BodyLabel}>
          <MarkdownField source="pair:description" addLabel={false} />
        </MainList>
      </ShowPage>
    </ShowBase>
  );
};

export default Show;