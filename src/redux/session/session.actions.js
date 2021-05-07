import { sessionService } from 'redux-react-session';
import axios from 'axios';

export const login = (username, password, history) => () => axios({
  method: 'post',
  url: 'http://localhost:3000/login',
  data: {
    data: {
      attributes: {
        username,
        password,
      },
    },
  },
})
  .then(({ data: res }) => {
    const { data: { relationships: { user: { meta: { username } } } } } = res;
    const { data: { attributes: { token } } } = res;

    sessionService.saveSession({ token })
      .then(() => {
        sessionService.saveUser({ username })
          .then(() => {
            history.push('/');
          });
      });
  })
  .catch((err) => {
    // eslint-disable-next-line
              console.log(err);
  });

export const logout = (history) => () => sessionService.loadSession()
  .then(({ token }) => {
    axios({
      method: 'delete',
      url: 'http://localhost:3000/logout',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        sessionService.deleteSession()
          .then(() => {
            sessionService.deleteUser();
            history.push('/');
          });
      })
      .catch((err) => {
        // eslint-disable-next-line
                console.log(err);
      });
  })
  .catch((err) => {
    // eslint-disable-next-line
              console.log(err);
  });

export const openRoutineDay = (day, history) => () => sessionService.loadSession()
  .then(({ token }) => {
    axios({
      method: 'post',
      url: 'http://localhost:3000/routines',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        data: {
          attributes: {
            day: day.toISOString().substring(0, 10),
          },
        },
      },
    })
      .then(({ data: { data: { id } } }) => {
        history.push(`/routine/${id}`);
      })
      .catch(() => {
        axios({
          method: 'get',
          url: 'http://localhost:3000/routines',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            data: {
              attributes: {
                day: day.toISOString().substring(0, 10),
              },
            },
          },
        })
          .then(({ data: { data: routines } }) => {
            const routine = routines
              .find((routine) => routine.attributes.day === day.toISOString()
                .substring(0, 10));

            if (routine) {
              history.push(`/routine/${routine.id}`);
            } else {
              history.push('/not-found');
            }
          })
          .catch(() => {
            history.push('/not-found');
          });
      });
  })
  .catch(() => {
    history.push('signin');
  });
