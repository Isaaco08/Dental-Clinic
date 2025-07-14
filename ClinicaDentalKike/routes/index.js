const routerUsuarios = require('./usuarios.js');
const routerTratamientos = require('./tratamientos.js');
const routerCitas = require('./citas.js');
const routerExpedientes = require('./expedientes.js');
const routerPacientes = require('./pacientes.js');

function routerAPI(app){
    app.use('/usuario', routerUsuarios);
    app.use('/tratamiento', routerTratamientos);
    app.use('/cita', routerCitas);
    app.use('/expedienteDePaciente', routerExpedientes);
    app.use('/paciente', routerPacientes);
}

module.exports = routerAPI; 