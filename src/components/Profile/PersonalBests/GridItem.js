import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

function gridItem({ label, children, descriptor }) {

  return (
    <Grid.Column stretched>
      <BestLabel style={{ textAlign: 'center', fontWeight: '400' }}>{label}</BestLabel>
      <div style={{ textAlign: "center" }}>
        <Icon size="huge" name="trophy" color="yellow"/>
        <BestLabel style={{ marginTop: '1rem', fontWeight: '400' }}>{children} {descriptor && `${descriptor}`}</BestLabel>
      </div>
    </Grid.Column>
  );
};

const BestLabel = styled.h2`
  textAlign: center;
  font-weight: 400;

  @media screen and (max-width: 900px) {
    font-size: 1.5rem;
  }

  @media screen and (max-width: 820px) {
    font-size: 1.2rem;
  }
`;

export default gridItem;
