const validation = {
  create:
  {
    name:
    {
      required: true,
      regex: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
      in: ['body'],
      errorMessage: 'Name is required',
    },
    email:
    {
      required: true,
      string: true,
      regex: /[a-z]([[-]*\w+[.]*){1,63}@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
      in: ['body'],
      errorMessage: 'email is required',
    },
    mob:
    {
      required: true,
      number: true,
      regex: /[0-9]+$/,
      in: ['body'],
      length: 10,
      errorMessage: 'mobile no. is required',
      custom: (reqMethod, req, res, next) => {
        if (req[reqMethod].mob !== undefined) {
          if (req[reqMethod].mob.length !== 10)
            return true;
        }
        return false;
      }
    },
    query: {
      required: true,
      in: ['body'],
      errorMessage: 'Query is required',
      length: 150,
      custom: (reqMethod, req, res, next) => {
        if (req[reqMethod].mob !== undefined) {
          if (req[reqMethod].mob.length !== 150)
            return true;
        }
        return false;
      }

    }
  },
  delete:
  {
    id:
    {
      required: true,
      errorMessage: 'Id is required',
      in: ['params']
    }
  },
  get:
  {
    skip:
    {
      required: false,
      default: 0,
      number: true,
      regex: /[0-9]+/,
      in: ['query'],
      errorMessage: 'Skip is invalid',
      custom: (reqMethod, req, res, next): void => {
        if (req[reqMethod].skip === undefined) {
          req[reqMethod].skip = '0';
        }
      }
    },
    limit:
    {
      required: false,
      default: 10,
      number: true,
      regex: /[0-9]+/,
      in: ['query'],
      errorMessage: 'Limit is invalid',
      custom: (reqMethod, req, res, next): void => {
        if (req[reqMethod].limit === undefined) {
          req[reqMethod].limit = '10';
        }
      }
    },
    order:
    {
      required: false,
      default: 1,
      in: ['query'],
      errorMessage: 'Order is invalid',
      custom: (reqMethod, req, res, next): void => {
        if (req[reqMethod].order === undefined || req[reqMethod].order !== '-1') {
          req[reqMethod].order = '1';
        }
      }
    }
  }
};

export default validation;
