import React, { useEffect } from 'react';
import { Container, } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';


function App() {

  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])
  if (!commonStore.appLoaded) return <LoadingComponent content='Loading..' />
  return (
    <>
      <ModalContainer />
      <Route exact path="/" component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Route path='/activities/' component={ActivityDashboard} />
              {/* <Route path='/activities/:id' component={ActivityDetails} />
              <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} /> */}
              <Route path='/login' component={LoginForm} />
            </Container>
          </>
        )}
      />

    </>


  );
}

export default observer(App);
