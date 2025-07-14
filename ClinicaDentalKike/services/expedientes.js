const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

class Expedientes {

  constructor() {

  };

  async registrarAuditoria(UsuarioIdAuditoria, Accion, DescripcionAuditoria) {
    try {
      await prisma.auditoria.create({
        data: {
          UsuarioIdAuditoria: UsuarioIdAuditoria,
          Accion: Accion,
          DescripcionAuditoria: DescripcionAuditoria
        }
      });
    } catch (error) {
      console.error(`No se pudo registrar la auditoría debido al error: ${error}`);
    }
  }

  async Agregar(UsuarioId, DescripcionDeExpediente, UsuarioIdAuditoria) {
    let resultado;
    try {
      resultado = await prisma.expedienteDePaciente.create({
        data: {
        UsuarioId: UsuarioId,
        DescripcionDeExpediente: DescripcionDeExpediente,
        }
      });
      await this.registrarAuditoria(UsuarioIdAuditoria, 'Crear', `Se creó un expediente con descripción: ${DescripcionDeExpediente}`);
    } catch (error) {
      console.error(`No se pudo insertar el expediente ${DescripcionDeExpediente} debido al error: ${error}`);
    }
    return resultado;
  };

  async Actualizar(ExpedienteDePacienteId, expedienteData, UsuarioIdAuditoria) {
    let resultado;
    try {
      resultado = await prisma.expedienteDePaciente.update({
        where: { ExpedienteDePacienteId: parseInt(ExpedienteDePacienteId) },
        data: { 
          DescripcionDeExpediente: expedienteData.DescripcionDeExpediente,
          UsuarioId: expedienteData.UsuarioId
        },
      });
      await this.registrarAuditoria(UsuarioIdAuditoria, 'Actualizar', `Se actualizó el expediente con ID: ${ExpedienteDePacienteId}`);
    } catch (error) {
      console.error(`No se pudo actualizar el expediente ${ExpedienteDePacienteId} debido al error: ${error}`);
    }
    return resultado;
  };

  async Borrar(ExpedienteDePacienteId, UsuarioIdAuditoria) {
    let resultado;
    try {
      resultado = await prisma.expedienteDePaciente.delete({
        where: {
            ExpedienteDePacienteId: parseInt(ExpedienteDePacienteId),
        },
      });
      await this.registrarAuditoria(UsuarioIdAuditoria, 'Eliminar', `Se eliminó el expediente con ID: ${ExpedienteDePacienteId}`);
    } catch (error) {
      console.error(`No se pudo borrar el expediente ${ExpedienteDePacienteId} debido al error: ${error}`);
    }
    return resultado;
  };

  Listar(ExpedienteDePacienteId) {
    let Expediente;
    if (ExpedienteDePacienteId === undefined) {
        Expediente = prisma.expedienteDePaciente.findMany();
    } else {
        Expediente = prisma.expedienteDePaciente.findMany({
        where: {
            ExpedienteDePacienteId: parseInt(ExpedienteDePacienteId),
        },
      });
    }
    return Expediente;
  };
}

module.exports = Expedientes;