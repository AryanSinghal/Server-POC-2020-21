const validation = {
  get:
  {
  },
  login:
  {
    email:
    {
      required: true,
      string: true,
      regex: /[a-z]([[-]*\w+[.]*){1,63}@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
      in: ['body'],
      errorMessage: 'email is required'
    },
    password:
    {
      required: true,
      in: ['body'],
    }
  }
};

export default validation;