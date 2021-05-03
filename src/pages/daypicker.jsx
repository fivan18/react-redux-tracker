import React from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import { withRouter } from 'react-router-dom';
import { sessionService } from 'redux-react-session';
import axios from 'axios';

const Daypicker = ({ history }) => {
  const onClickDay = (day) => {
    sessionService.loadSession()
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
                  .find((routine) => routine.attributes.day === day.toISOString().substring(0, 10));

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
    history.push();
  };

  return (
    <Calendar
      onClickDay={onClickDay}
    />
  );
};

Daypicker.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(Daypicker);
