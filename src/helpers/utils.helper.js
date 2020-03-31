const Handlebars = require("handlebars");

Handlebars.registerHelper('concat', function() {
    arguments = [...arguments].slice(0, -1);
    return arguments.join('');
});