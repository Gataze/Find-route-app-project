const axios = require("axios");

const handler = async (event) => {
  const { placeQuery } = event.queryStringParameters;

  console.log(event.queryStringParameters);

  const API_SECRET = "iRlqOJYRE5_3AlvbQcOgZbRzQkr358KBNCDYYTFbTOE";

  const url = `https://geocode.search.hereapi.com/v1/geocode?apikey=${API_SECRET}&q=${placeQuery}`;

  try {
    const { data } = await axios(url);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.log(error.response);
    const { status, statusText, headers, data } = error.response;
    return {
      statusCode: status,
      body: JSON.stringify(status, statusText, headers, data),
    };
  }
};

module.exports = { handler };
