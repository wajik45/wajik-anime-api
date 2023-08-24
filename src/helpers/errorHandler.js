export const errorHandler = (error) => {
  if (error.response === undefined) {
    return {
      statusCode: 500,
      error: error.name,
      message: error.message,
      details: error,
    };
  }

  return {
    statusCode: error.response.status,
    error: error.name,
    message: error.message,
  };
};

export default errorHandler;
