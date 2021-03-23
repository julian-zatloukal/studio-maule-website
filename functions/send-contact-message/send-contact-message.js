// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event, context) => {
  try {

    console.log(process.env)


    const subject = event.queryStringParameters.name || 'World'
    return {
      statusCode: 200,
      body: JSON.stringify({ event: JSON.stringify(event), context: JSON.stringify(context) }),

    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
