exports.options = {
  routePrefix: '/documentation',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'Customer Service APIs',
      description: 'Customer related all CRUD APIs',
      version: '1.0.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    },
    host: 'jilani-e-commerce-notification.herokuapp.com',
    schemes: ['https'],
    consumes: ['application/json'],
    produces: ['application/json']
  }
}