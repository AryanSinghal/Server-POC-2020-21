class SystemResponse {
  static success = (res, data, message = 'Success') => {
    return res.status(200).send({
      status: 'ok',
      message,
      data
    });
  }
  static failure = (res, err, message = 'Failure', status = 400) => {
    return res.status(status).send({
      status: err.status || 'Bad Request',
      message,
      err
    });
  }
}

export default SystemResponse;
