const validation = {
  updatePassword: {
    email: {
      required: true,
      string: true,
      regex: /[a-z]([[-]*\w+[.]*){1,63}@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
      in: ['body'],
      errorMessage: 'email is required'
    },
    oldPassword: {
      required: true,
      in: ['body'],
      errorMessage: 'old password is required'
    },
    newPassword: {
      required: true,
      in: ['body'],
      errorMessage: 'new password is required'
    }
  },
  login: {
    email: {
      required: true,
      string: true,
      regex: /[a-z]([[-]*\w+[.]*){1,63}@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
      in: ['body'],
      errorMessage: 'email is required'
    },
    password: {
      required: true,
      in: ['body'],
      errorMessage: 'password is required'
    }
  }
};

export default validation;
