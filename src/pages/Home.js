import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition, Card, Item, Loader, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

import Register from './Register';
import { AuthContext } from '../context/auth';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';
import BasicStats from '../components/Profile/BasicStats';
import PersonalBests from '../components/Profile/PersonalBests';
import TimeCard from '../components/TimeCard';

function Home() {
  const { user } = useContext(AuthContext);
  const [refetchData, setRefetchData] = useState(false);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  let firstSixTimes;
  if (data) {
    firstSixTimes = data.getTimes.slice(0, 6);
  }

  return (
    <>
    <Container user={user}>
      <Title>We Run Here.</Title>
      {!user && (
        <Header>
          <Welcome>
            <Subtitle>Whether you're a lifelong runner or just getting started, welcome to your new home for all things running!</Subtitle>
            <Data>
              <DataSet>
                <Icon name="trophy" color="yellow"/>
                  <DataHeader>Personal Bests</DataHeader>
                  <DataText>Everytime you hit a new personal best everyone will see it on your profile!</DataText>
              </DataSet>  
              <DataSet>
                <Icon name="clipboard list" color="blue"/>
                  <DataHeader>Stats</DataHeader>
                  <DataText>From total miles to average speed we keep track of all your stats!</DataText>
              </DataSet>  
            </Data>
            <Subtitle>We look forward to meeting you! Scroll down below to see what our community has been up to and click on a username or picture to see their profile!</Subtitle>
          </Welcome >
          <Register />
      </Header>
      )}
      {user && (
          <Grid.Column width={4}>
            <Grid.Row>
              <PostForm onSubmitHandler={() => setRefetchData(true)} />
            </Grid.Row>
            <Grid.Row>
              <Card style={{ marginTop: '2rem' }}>
                <Card.Content>
                  <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Stats</h2>
                  <BasicStats username={user.username} refetchData={refetchData}/>
                  <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Personal Bests</h2>
                  <PersonalBests home username={user.username} refetchData={refetchData}/>
                </Card.Content>
              </Card>
            </Grid.Row>
          </Grid.Column>
        )}
        <RunFeed>
        <h1 style={{ textAlign: 'center' }}>Recent Activity</h1>
          {loading ? <Loader style={{ marginTop: '4rem' }} active inline="centered" size="big" /> : (
            <Transition.Group animation='fade' as={Item.Group} divided duration={200} style={{ width: '100%' }}>
              {firstSixTimes.map(time => (
                <TimeCard key={time.id} type="home" data={time} />
              ))}
            </Transition.Group>
          )}
        </RunFeed>
      </Container>
    </>
  )
};
const Container = styled.div`
  margin: 0;
  padding: 1rem 0;
  display: ${props => props.user ? 'flex' : null};

  h1 {
    display: ${props => props.user ? 'none' : null};
  }
`;

const Header = styled.header`
  padding: 2rem 0 6rem 0;
  display: flex;
  text-align: left;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    padding: 0;
  }
`;

const Title = styled.h1`
  font-size: 5rem;
  font-weight: 400;
  text-align: center;
  margin: 1rem 0;

  @media screen and (max-width: 800px) {
    font-size: 4rem;
  }

  @media screen and (max-width: 600px) {
    font-size: 3.5rem;
  }
`;

const Subtitle = styled(Title)`
  font-size: 1.8rem;

  @media screen and (max-width: 800px) {
    font-size: 1.6rem;
  }

  @media screen and (max-width: 600px) {
    font-size: 1.4rem;
  }
`;

const Welcome = styled.div`
  width: 45%;
  margin: 1rem auto;

  @media screen and (max-width: 1000px) {
    width: 95%;
    padding: 0 0.5rem;
  }
`;

const Data = styled.div`
  display: flex;
  justify-content: center;
  margin: 3.5rem 0;

  @media screen and (max-width: 500px) {
    margin: 2rem 0;
  }
`;

const DataSet = styled.div`
  flex: 1;
  text-align: center;
  margin: 2rem 0.5rem 0 0.5rem;

  .icon {
    font-size: 6em;
    
    @media screen and (max-width: 500px) {
      font-size: 4em;
    }
  }
`;

const DataHeader = styled.h3`
  font-size: 2rem;
  padding: 0;
  margin: 0;
  margin-top: -1rem;

  @media screen and (max-width: 500px) {
    font-size: 1.5rem;
  }
`;

const DataText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 1.2rem;

  @media screen and (max-width: 500px) {
    font-size: 1rem;
  }
`;


const RunFeed = styled.div`
  width: 70%;
  margin: 1rem auto;

  @media screen and (max-width: 1100px) {
    width: 80%;
  }

  @media screen and (max-width: 900px) {
    width: 90%;
  }

  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;

export default Home;
