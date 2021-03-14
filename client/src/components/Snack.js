import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

function SlideTransition(props) {
  return <Slide {...props} direction='down' />;
}

const Snack = ({ open, handleClose, message, severity }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      TransitionComponent={SlideTransition}
      autoHideDuration={6000}
      severity={severity}
      open={open}
      onClose={handleClose}
      message={message}
      action={
        <React.Fragment>
          <IconButton
            size='small'
            aria-label='close'
            color='inherit'
            onClick={handleClose}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        </React.Fragment>
      }
    />
  );
};

export default Snack;
