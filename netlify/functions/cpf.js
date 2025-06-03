const axios = require("axios");

exports.handler = async (event) => {
  const cpf = event.queryStringParameters?.cpf;

  if (!cpf) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "CPF não informado" }),
    };
  }

  try {
    const response = await axios.post(
      "https://retirar-pedidos.com/api.php",
      new URLSearchParams({ cpf }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Erro ao consultar CPF",
        detalhes: error.message,
      }),
    };
  }
};
