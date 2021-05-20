import { sessionService } from 'redux-react-session';
import axios from 'axios';

import { apiUrl } from '../../utilities/utils';

export const login = (username, password, history) => () => axios({
  method: 'post',
  url: `${apiUrl}/login`,
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
  .catch(() => {
    history.push('/not-found');
  });

export const logout = (history) => () => sessionService.loadSession()
  .then(({ token }) => {
    axios({
      method: 'delete',
      url: `${apiUrl}/logout`,
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
      .catch(() => {
        history.push('/not-found');
      });
  })
  .catch(() => {
    history.push('/not-found');
  });

export const openRoutineDay = (date, history) => () => sessionService.loadSession()
  .then(({ token }) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const strDate = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;

    axios({
      method: 'post',
      url: `${apiUrl}/routines`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        data: {
          attributes: {
            day: strDate,
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
          url: `${apiUrl}/routines`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            data: {
              attributes: {
                day: strDate,
              },
            },
          },
        })
          .then(({ data: { data: routines } }) => {
            const routine = routines
              .find((routine) => routine.attributes.day === strDate);

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
