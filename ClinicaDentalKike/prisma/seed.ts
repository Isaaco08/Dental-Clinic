import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ["query"] })


async function main() { 

    await prisma.usuario.createMany({
        data: [
          {
            UsuarioId: '901180450',                         //Doctores
            TipoDeUsuario: 'Doctor',
            Nombre: 'Isaac',
            PrimerApellido: 'Alvarado',
            SegundoApellido: 'Toruño',
            Contrasena: '$2b$10$earvN.JIJj2OJ9bHkO12RuWxRPNOqrn1n/SaRCNwNcqnf3cMgD/Lu',
          },
          {
            UsuarioId: '208800834',
            TipoDeUsuario: 'Doctor',
            Nombre: 'Jimena',
            PrimerApellido: 'Chaves',
            SegundoApellido: 'Ugalde',
            Contrasena: '$2b$10$earvN.JIJj2OJ9bHkO12RuWxRPNOqrn1n/SaRCNwNcqnf3cMgD/Lu',
          },
          {
            UsuarioId: '208490269',
            TipoDeUsuario: 'Doctor',
            Nombre: 'Daniel',
            PrimerApellido: 'Solera',
            SegundoApellido: 'Mena',
            Contrasena: '$2b$10$earvN.JIJj2OJ9bHkO12RuWxRPNOqrn1n/SaRCNwNcqnf3cMgD/Lu',
          },
          {
            UsuarioId: '402640600',
            TipoDeUsuario: 'Doctor',
            Nombre: 'Betzabé',
            PrimerApellido: 'Alfaro',
            SegundoApellido: 'Salazar',
            Contrasena: '$2b$10$earvN.JIJj2OJ9bHkO12RuWxRPNOqrn1n/SaRCNwNcqnf3cMgD/Lu',
          },
          {
            UsuarioId: '119180043',
            TipoDeUsuario: 'Doctor',
            Nombre: 'Yahury',
            PrimerApellido: 'Alvarado',
            SegundoApellido: 'Salas',
            Contrasena: '$2b$10$earvN.JIJj2OJ9bHkO12RuWxRPNOqrn1n/SaRCNwNcqnf3cMgD/Lu',
          },
          {
            UsuarioId: '208510145',                         //Recepcionistas
            TipoDeUsuario: 'Recepcionista',
            Nombre: 'Rachel',
            PrimerApellido: 'Arias',
            SegundoApellido: 'Arancibia',
            Contrasena: '$2b$10$earvN.JIJj2OJ9bHkO12RuWxRPNOqrn1n/SaRCNwNcqnf3cMgD/Lu',
          },
          {
            UsuarioId: '208570335',
            TipoDeUsuario: 'Recepcionista',
            Nombre: 'Hersal',
            PrimerApellido: 'Alfaro',
            SegundoApellido: 'Cisneros',
            Contrasena: '$2b$10$earvN.JIJj2OJ9bHkO12RuWxRPNOqrn1n/SaRCNwNcqnf3cMgD/Lu',
          },
          {
            UsuarioId: '208500936',
            TipoDeUsuario: 'Recepcionista',
            Nombre: 'Elías',
            PrimerApellido: 'Saborio',
            SegundoApellido: 'Morera',
            Contrasena: '$2b$10$earvN.JIJj2OJ9bHkO12RuWxRPNOqrn1n/SaRCNwNcqnf3cMgD/Lu',
          },
          {
            UsuarioId: '208160848',
            TipoDeUsuario: 'Recepcionista',
            Nombre: 'Reichel',
            PrimerApellido: 'Alvarado',
            SegundoApellido: 'Alvarado',
            Contrasena: '$2b$10$earvN.JIJj2OJ9bHkO12RuWxRPNOqrn1n/SaRCNwNcqnf3cMgD/Lu',
          },
          {
            UsuarioId: '504540035',
            TipoDeUsuario: 'Recepcionista',
            Nombre: 'Alexander',
            PrimerApellido: 'Azofeifa',
            SegundoApellido: 'Leal',
            Contrasena: '$2b$10$earvN.JIJj2OJ9bHkO12RuWxRPNOqrn1n/SaRCNwNcqnf3cMgD/Lu',
          },
          {
            UsuarioId: '208510587',                         //Pacientes
            TipoDeUsuario: 'Paciente',
            Nombre: 'Eduardo',
            PrimerApellido: 'Zuñiga',
            SegundoApellido: 'Umaña',
            Contrasena: '$2b$10$earvN.JIJj2OJ9bHkO12RuWxRPNOqrn1n/SaRCNwNcqnf3cMgD/Lu',
          },
          {
            UsuarioId: '208480341',
            TipoDeUsuario: 'Paciente',
            Nombre: 'Dylan',
            PrimerApellido: 'Salas',
            SegundoApellido: 'Navarro',
            Contrasena: '$2b$10$earvN.JIJj2OJ9bHkO12RuWxRPNOqrn1n/SaRCNwNcqnf3cMgD/Lu',
          },
          {
            UsuarioId: '208480299',
            TipoDeUsuario: 'Paciente',
            Nombre: 'Brandon',
            PrimerApellido: 'Murillo',
            SegundoApellido: 'Vega',
            Contrasena: '$2b$10$earvN.JIJj2OJ9bHkO12RuWxRPNOqrn1n/SaRCNwNcqnf3cMgD/Lu',
          },
          {
            UsuarioId: '208550839',
            TipoDeUsuario: 'Paciente',
            Nombre: 'Sebastian',
            PrimerApellido: 'Mora',
            SegundoApellido: 'Marquez',
            Contrasena: '$2b$10$earvN.JIJj2OJ9bHkO12RuWxRPNOqrn1n/SaRCNwNcqnf3cMgD/Lu',
          },
          {
            UsuarioId: '703040789',
            TipoDeUsuario: 'Paciente',
            Nombre: 'Jonnan',
            PrimerApellido: 'Pais',
            SegundoApellido: 'Salguera',
            Contrasena: '$2b$10$earvN.JIJj2OJ9bHkO12RuWxRPNOqrn1n/SaRCNwNcqnf3cMgD/Lu',
          },
          {
            UsuarioId: '208480511',
            TipoDeUsuario: 'Paciente',
            Nombre: 'Miguel',
            PrimerApellido: 'Santamaría',
            SegundoApellido: 'Obando',
            Contrasena: '$2b$10$earvN.JIJj2OJ9bHkO12RuWxRPNOqrn1n/SaRCNwNcqnf3cMgD/Lu',
          },
          {
            UsuarioId: '208570704',
            TipoDeUsuario: 'Paciente',
            Nombre: 'Kenneth',
            PrimerApellido: 'Santamaría',
            SegundoApellido: 'Castro',
            Contrasena: '$2b$10$earvN.JIJj2OJ9bHkO12RuWxRPNOqrn1n/SaRCNwNcqnf3cMgD/Lu',
          },
          {
            UsuarioId: '402580816',
            TipoDeUsuario: 'Paciente',
            Nombre: 'Kate',
            PrimerApellido: 'Campos',
            SegundoApellido: 'Vindas',
            Contrasena: '$2b$10$earvN.JIJj2OJ9bHkO12RuWxRPNOqrn1n/SaRCNwNcqnf3cMgD/Lu',
          },
          {
            UsuarioId: '118920175',
            TipoDeUsuario: 'Paciente',
            Nombre: 'Felipe',
            PrimerApellido: 'Trejos',
            SegundoApellido: 'Perez',
            Contrasena: '$2b$10$earvN.JIJj2OJ9bHkO12RuWxRPNOqrn1n/SaRCNwNcqnf3cMgD/Lu',
          },
          {
            UsuarioId: '208580589',
            TipoDeUsuario: 'Paciente',
            Nombre: 'Alonso',
            PrimerApellido: 'Balladares',
            SegundoApellido: 'Barboza',
            Contrasena: '$2b$10$earvN.JIJj2OJ9bHkO12RuWxRPNOqrn1n/SaRCNwNcqnf3cMgD/Lu',
          },
        ],
      });

      await prisma.tratamiento.createMany({
        data: [
          {
            TratamientoId: 1,            
            DescripcionDeTratamiento: 'Blanqueamiento Dental Láser',
          },
          {
            TratamientoId: 2,
            DescripcionDeTratamiento: 'Extracción (quirúrgica o complicada)',
          },
          {
            TratamientoId: 3,
            DescripcionDeTratamiento: 'Extracción (Simple)',
          },
          {
            TratamientoId: 4,
            DescripcionDeTratamiento: 'Limpieza Dental Regular',
          },
          {
            TratamientoId: 5,
            DescripcionDeTratamiento: 'Limpieza profunda (por cuadrante)',
          },
          {
            TratamientoId: 6,
            DescripcionDeTratamiento: 'Relleno de Resina',
          },
          {
            TratamientoId: 7,
            DescripcionDeTratamiento: 'Relleno de Resina (2 superficies)',
          },
          {
            TratamientoId: 8,
            DescripcionDeTratamiento: 'Corona sobre Implante Estándar (soporte incluido)',
          },
          {
            TratamientoId: 9,
            DescripcionDeTratamiento: 'Implante Dental de Titanio (soporte y corona estándar incluidos)',
          },
          {
            TratamientoId: 10,
            DescripcionDeTratamiento: 'Implante Dental Estándar de Titanio (solo implante)',
          }
        ],
      });
      
      await prisma.cita.createMany({
        data: [
          {
            CitaId: 1,
            UsuarioId: '208510587', // Eduardo Zuñiga Umaña            
            DescripcionDeCita: 'Blanqueamiento Dental Láser',
            TratamientoId: 1,
            FechaDeCita: '2024-07-07T10:00:00Z',
          },
          {
            CitaId: 2,
            UsuarioId: '208480341', // Dylan Salas Navarro
            DescripcionDeCita: 'Extracción (quirúrgica o complicada)',
            TratamientoId: 2,
            FechaDeCita: '2024-07-10T10:00:00Z',
          },
          {
            CitaId: 3,
            UsuarioId: '208480299', // Brandon Murillo Vega
            DescripcionDeCita: 'Extracción (Simple)',
            TratamientoId: 3,
            FechaDeCita: '2024-07-11T10:00:00Z',
          },
          {
            CitaId: 4,
            UsuarioId: '208550839', // Sebastian Mora Marquez
            DescripcionDeCita: 'Limpieza Dental Regular',
            TratamientoId: 4,
            FechaDeCita: '2024-07-14T10:00:00Z',
          },
          {
            CitaId: 5,
            UsuarioId: '208510587', // Eduardo Zuñiga Umaña 
            DescripcionDeCita: 'Limpieza profunda (por cuadrante)',
            TratamientoId: 5,
            FechaDeCita: '2024-07-18T10:00:00Z',
          },
          {
            CitaId: 6,
            UsuarioId: '208480341', // Dylan Salas Navarro
            DescripcionDeCita: 'Relleno de Resina',
            TratamientoId: 6,
            FechaDeCita: '2024-07-21T10:00:00Z',
          },
          {
            CitaId: 7,
            UsuarioId: '208480299', // Brandon Murillo Vega
            DescripcionDeCita: 'Relleno de Resina (2 superficies)',
            TratamientoId: 7,
            FechaDeCita: '2024-07-25T10:00:00Z',
          },
          {
            CitaId: 8,
            UsuarioId: '208550839', // Sebastian Mora Marquez
            DescripcionDeCita: 'Corona sobre Implante Estándar (soporte incluido)',
            TratamientoId: 8,
            FechaDeCita: '2024-07-29T10:00:00Z',
          },
          {
            CitaId: 9,
            UsuarioId: '208510587', // Eduardo Zuñiga Umaña 
            DescripcionDeCita: 'Implante Dental de Titanio (soporte y corona estándar incluidos)',
            TratamientoId: 9,
            FechaDeCita: '2024-08-01T10:00:00Z',
          },
          {
            CitaId: 10,
            UsuarioId: '208480341', // Dylan Salas Navarro
            DescripcionDeCita: 'Implante Dental Estándar de Titanio (solo implante)',
            TratamientoId: 10,
            FechaDeCita: '2024-08-02T10:00:00Z',
          },
          {
            CitaId: 11,
            UsuarioId: '703040789', // Jonnan Pais Salguera          
            DescripcionDeCita: 'Blanqueamiento Dental Láser',
            TratamientoId: 1,
            FechaDeCita: '2024-08-02T10:00:00Z',
          },
          {
            CitaId: 12,
            UsuarioId: '208480511', // Miguel Santamaría Obando
            DescripcionDeCita: 'Extracción (quirúrgica o complicada)',
            TratamientoId: 2,
            FechaDeCita: '2024-08-04T10:00:00Z',
          },
          {
            CitaId: 13,
            UsuarioId: '208570704', // Kenneth Santamaría Castro
            DescripcionDeCita: 'Extracción (Simple)',
            TratamientoId: 3,
            FechaDeCita: '2024-08-05T10:00:00Z',
          },
          {
            CitaId: 14,
            UsuarioId: '402580816', // Kate Campos Vindas
            DescripcionDeCita: 'Limpieza Dental Regular',
            TratamientoId: 4,
            FechaDeCita: '2024-08-05T10:00:00Z',
          },
          {
            CitaId: 15,
            UsuarioId: '118920175', // Felipe Trejos Perez
            DescripcionDeCita: 'Limpieza profunda (por cuadrante)',
            TratamientoId: 5,
            FechaDeCita: '2024-08-06T10:00:00Z',
          },
          {
            CitaId: 16,
            UsuarioId: '208580589', // Alonso Balladares Barboza
            DescripcionDeCita: 'Relleno de Resina',
            TratamientoId: 6,
            FechaDeCita: '2024-08-07T10:00:00Z',
          },
          {
            CitaId: 17,
            UsuarioId: '703040789', // Jonnan Pais Salguera 
            DescripcionDeCita: 'Relleno de Resina (2 superficies)',
            TratamientoId: 7,
            FechaDeCita: '2024-08-08T10:00:00Z',
          },
          {
            CitaId: 18,
            UsuarioId: '208480511', // Miguel Santamaría Obando
            DescripcionDeCita: 'Corona sobre Implante Estándar (soporte incluido)',
            TratamientoId: 8,
            FechaDeCita: '2024-08-09T10:00:00Z',
          },
          {
            CitaId: 19,
            UsuarioId: '208570704', // Kenneth Santamaría Castro
            DescripcionDeCita: 'Implante Dental de Titanio (soporte y corona estándar incluidos)',
            TratamientoId: 9,
            FechaDeCita: '2024-08-11T10:00:00Z',
          },
          {
            CitaId: 20,
            UsuarioId: '402580816', // Kate Campos Vindas
            DescripcionDeCita: 'Implante Dental Estándar de Titanio (solo implante)',
            TratamientoId: 10,
            FechaDeCita: '2024-08-15T10:00:00Z',
          },
          {
            CitaId: 21,
            UsuarioId: '118920175', // Felipe Trejos Perez          
            DescripcionDeCita: 'Blanqueamiento Dental Láser',
            TratamientoId: 1,
            FechaDeCita: '2024-08-17T10:00:00Z',
          },
          {
            CitaId: 22,
            UsuarioId: '208580589', // Alonso Balladares Barboza
            DescripcionDeCita: 'Extracción (quirúrgica o complicada)',
            TratamientoId: 2,
            FechaDeCita: '2024-08-19T10:00:00Z',
          },
          {
            CitaId: 23,
            UsuarioId: '703040789', // Jonnan Pais Salguera 
            DescripcionDeCita: 'Extracción (Simple)',
            TratamientoId: 3,
            FechaDeCita: '2024-08-21T10:00:00Z',
          },
          {
            CitaId: 24,
            UsuarioId: '208480511', // Miguel Santamaría Obando
            DescripcionDeCita: 'Limpieza Dental Regular',
            TratamientoId: 4,
            FechaDeCita: '2024-08-22T10:00:00Z',
          },
          {
            CitaId: 25,
            UsuarioId: '208570704', // Kenneth Santamaría Castro
            DescripcionDeCita: 'Limpieza profunda (por cuadrante)',
            TratamientoId: 5,
            FechaDeCita: '2024-08-23T10:00:00Z',
          },
          {
            CitaId: 26,
            UsuarioId: '402580816', // Kate Campos Vindas
            DescripcionDeCita: 'Relleno de Resina',
            TratamientoId: 6,
            FechaDeCita: '2024-08-24T10:00:00Z',
          },
          {
            CitaId: 27,
            UsuarioId: '118920175', // Felipe Trejos Perez
            DescripcionDeCita: 'Relleno de Resina (2 superficies)',
            TratamientoId: 7,
            FechaDeCita: '2024-08-29T10:00:00Z',
          },
          {
            CitaId: 28,
            UsuarioId: '208580589', // Alonso Balladares Barboza
            DescripcionDeCita: 'Corona sobre Implante Estándar (soporte incluido)',
            TratamientoId: 8,
            FechaDeCita: '2024-08-29T10:00:00Z',
          },
          {
            CitaId: 29,
            UsuarioId: '703040789', // Jonnan Pais Salguera 
            DescripcionDeCita: 'Implante Dental de Titanio (soporte y corona estándar incluidos)',
            TratamientoId: 9,
            FechaDeCita: '2024-08-30T10:00:00Z',
          },
          {
            CitaId: 30,
            UsuarioId: '208550839', // Sebastian Mora Marquez
            DescripcionDeCita: 'Implante Dental Estándar de Titanio (solo implante)',
            TratamientoId: 10,
            FechaDeCita: '2024-08-31T10:00:00Z',
          },
        ],
      });
      
      await prisma.expedienteDePaciente.createMany({
        data: [
          {
            ExpedienteDePacienteId: 1,
            UsuarioId: '208510587', // Eduardo Zuñiga Umaña
            DescripcionDeExpediente: 'Historial de citas',
          },
          {
            ExpedienteDePacienteId: 2,
            UsuarioId: '208480341', // Dylan Salas Navarro
            DescripcionDeExpediente: 'Historial de citas',
          },
          {
            ExpedienteDePacienteId: 3,
            UsuarioId: '208480299', // Brandon Murillo Vega
            DescripcionDeExpediente: 'Historial de citas',
          },
          {
            ExpedienteDePacienteId: 4,
            UsuarioId: '208550839', // Sebastian Mora Marquez
            DescripcionDeExpediente: 'Historial de citas',
          },
          {
            ExpedienteDePacienteId: 5,
            UsuarioId: '703040789', // Jonnan Pais Salguera 
            DescripcionDeExpediente: 'Historial de citas',
          },
          {
            ExpedienteDePacienteId: 6,
            UsuarioId: '208480511', // Miguel Santamaría Obando
            DescripcionDeExpediente: 'Historial de citas',
          },
          {
            ExpedienteDePacienteId: 7,
            UsuarioId: '208570704', // Kenneth Santamaría Castro
            DescripcionDeExpediente: 'Historial de citas',
          },
          {
            ExpedienteDePacienteId: 8,
            UsuarioId: '402580816', // Kate Campos Vindas
            DescripcionDeExpediente: 'Historial de citas',
          },
          {
            ExpedienteDePacienteId: 9,
            UsuarioId: '118920175', // Felipe Trejos Perez
            DescripcionDeExpediente: 'Historial de citas',
          },
          {
            ExpedienteDePacienteId: 10,
            UsuarioId: '208580589', // Alonso Balladares Barboza
            DescripcionDeExpediente: 'Historial de citas',
          },
        ],
      });

      await prisma.auditoria.createMany({
        data: [
          {
            AuditoriaId: 1,
            UsuarioIdAuditoria: '901180450', // Isaac Alvarado Toruño
            Accion: 'Crear',
            DescripcionAuditoria: 'Creación de cita para Eduardo Zuñiga Umaña',
          },
          {
            AuditoriaId: 2,
            UsuarioIdAuditoria: '208800834', // Jimena Chaves Ugalde
            Accion: 'Actualizar',
            DescripcionAuditoria: 'Actualización de expediente de Dylan Salas Navarro',
          },
          {
            AuditoriaId: 3,
            UsuarioIdAuditoria: '208490269', // Daniel Solera Mena
            Accion: 'Crear',
            DescripcionAuditoria: 'Creación de cita para Brandon Murillo Vega',
          },
          {
            AuditoriaId: 4,
            UsuarioIdAuditoria: '208510145', // Rachel Arias Arancibia
            Accion: 'Crear',
            DescripcionAuditoria: 'Creación de expediente para Sebastian Mora Marquez',
          },
          {
            AuditoriaId: 5,
            UsuarioIdAuditoria: '208570335', // Hersal Alfaro Cisneros
            Accion: 'Crear',
            DescripcionAuditoria: 'Creación de cita para Alonso Balladares Barboza',
          },
          {
            AuditoriaId: 6,
            UsuarioIdAuditoria: '208160848', // Reichel Alvarado Alvarado
            Accion: 'Actualizar',
            DescripcionAuditoria: 'Actualización de cita para Kate Campos Vindas',
          },
          {
            AuditoriaId: 7,
            UsuarioIdAuditoria: '504540035', // Alexander Azofeifa Leal
            Accion: 'Crear',
            DescripcionAuditoria: 'Creación de expediente para Miguel Santamaría Obando',
          },
          {
            AuditoriaId: 8,
            UsuarioIdAuditoria: '119180043', // Yahury Alvarado Salas
            Accion: 'Crear',
            DescripcionAuditoria: 'Creación de cita para Kenneth Santamaría Castro',
          },
          {
            AuditoriaId: 9,
            UsuarioIdAuditoria: '208490269', // Daniel Solera Mena
            Accion: 'Actualizar',
            DescripcionAuditoria: 'Actualización de expediente de Sebastian Mora Marquez',
          },
          {
            AuditoriaId: 10,
            UsuarioIdAuditoria: '901180450', // Isaac Alvarado Toruño
            Accion: 'Actualizar',
            DescripcionAuditoria: 'Actualización de cita para Jonnan Pais Salguera',
          },
          {
            AuditoriaId: 11,
            UsuarioIdAuditoria: '208160848', // Reichel Alvarado Alvarado
            Accion: 'Crear',
            DescripcionAuditoria: 'Creación de cita para Dylan Salas Navarro',
          },
          {
            AuditoriaId: 12,
            UsuarioIdAuditoria: '208800834', // Jimena Chaves Ugalde
            Accion: 'Crear',
            DescripcionAuditoria: 'Creación de cita para Miguel Santamaría Obando',
          },
          {
            AuditoriaId: 13,
            UsuarioIdAuditoria: '208490269', // Daniel Solera Mena
            Accion: 'Actualizar',
            DescripcionAuditoria: 'Actualización de cita para Kate Campos Vindas',
          },
          {
            AuditoriaId: 14,
            UsuarioIdAuditoria: '402640600', // Betzabé Alfaro Salazar
            Accion: 'Actualizar',
            DescripcionAuditoria: 'Actualización de expediente de Alonso Balladares Barboza',
          },
          {
            AuditoriaId: 15,
            UsuarioIdAuditoria: '208570335', // Hersal Alfaro Cisneros
            Accion: 'Crear',
            DescripcionAuditoria: 'Creación de cita para Eduardo Zuñiga Umaña',
          },
          {
            AuditoriaId: 16,
            UsuarioIdAuditoria: '208160848', // Reichel Alvarado Alvarado
            Accion: 'Actualizar',
            DescripcionAuditoria: 'Actualización de cita para Jonnan Pais Salguera',
          },
          {
            AuditoriaId: 17,
            UsuarioIdAuditoria: '402640600', // Betzabé Alfaro Salazar
            Accion: 'Crear',
            DescripcionAuditoria: 'Creación de expediente para Eduardo Zuñiga Umaña',
          },
          {
            AuditoriaId: 18,
            UsuarioIdAuditoria: '119180043', // Yahury Alvarado Salas
            Accion: 'Crear',
            DescripcionAuditoria: 'Creación de cita para Felipe Trejos Perez',
          },
          {
            AuditoriaId: 19,
            UsuarioIdAuditoria: '208800834', // Jimena Chaves Ugalde
            Accion: 'Actualizar',
            DescripcionAuditoria: 'Actualización de expediente de Brandon Murillo Vega',
          },
          {
            AuditoriaId: 20,
            UsuarioIdAuditoria: '901180450', // Isaac Alvarado Toruño
            Accion: 'Actualizar',
            DescripcionAuditoria: 'Actualización de cita para Eduardo Zuñiga Umaña',
          },
        ],
      });
      
}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })