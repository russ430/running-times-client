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
    <Container>
      {!user && (
        <Header>
          <Welcome>
            <Title>We Run Here.</Title>
            <Subtitle>Whether you're a lifelong runner or just getting started, welcome to your new home for all things running!</Subtitle>
            <div style={{ display: 'flex', justifyContent: 'center', width: '90%', margin: '0 auto' }}>
              <div>
                <Icon name="clipboard list" size="massive" color="blue" style={{ margin: '2rem 0' }}/>
                <Icon name="trophy" size="massive" color="yellow" style={{ margin: '2rem 0' }}/>
              </div>  
              <div style={{ margin: '0 auto' }}>
                <div style={{ margin: '3rem 0 0 0' }}>
                  <h3 style={{ fontSize: '2rem', padding: '0', margin: '0' }}>Stats</h3>
                  <p style={{ fontSize: '1.2rem', padding: '0', margin: '0.5rem 0 0 0' }}>From total miles to average speed we keep track of all your stats!</p>
                </div>
                <div style={{ margin: '5rem 0 0 0' }}>
                  <h3 style={{ fontSize: '2rem', padding: '0', margin: '0' }}>Personal Bests</h3>
                  <p style={{ fontSize: '1.2rem', padding: '0', margin: '0.5rem 0 0 0' }}>Everytime you hit a new personal best everyone will see it on your profile!</p>
                </div>
              </div>  
            </div>
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
        <Grid.Column width={12} style={{ paddingBottom: '6rem' }}>
          <Grid columns={3}>
            <Grid.Row className="page-title">
              <h1>Recent Activity</h1>
            </Grid.Row>
            <Grid.Row >
              {loading ? <Loader style={{ marginTop: '4rem' }} active inline="centered" size="big" /> : (
                <Transition.Group animation='fade' as={Item.Group} divided duration={200} style={{ width: '95%', margin: '0 auto' }}>
                  {firstSixTimes.map(time => (
                    <TimeCard key={time.id} type="home" data={time} />
                  ))}
                </Transition.Group>
              )}
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Container>
    </>
  )
};

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
`;

const Subtitle = styled(Title)`
  font-size: 1.8rem;
`;

const Welcome = styled.div`
  width: 45%;
  margin: 0 auto;

  @media screen and (max-width: 1000px) {
    width: 95%;
    padding: 0 0.5rem;
    margin: 0;
  }
`;

const Container = styled.div`
  margin: 0;
  padding: 0;
`;

export default Home;
