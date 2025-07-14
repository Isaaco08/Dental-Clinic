const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

class Tratamientos {

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

  async Agregar(DescripcionDeTratamiento, UsuarioIdAuditoria) {
    let resultado;
    try {
      resultado = await prisma.tratamiento.create({
        data: {
        DescripcionDeTratamiento: DescripcionDeTratamiento,
        }
      });
      await this.registrarAuditoria(UsuarioIdAuditoria, 'Crear', `Se creó un tratamiento: ${DescripcionDeTratamiento}`);
    } catch (error) {
      console.error(`No se pudo insertar el tratamiento ${DescripcionDeTratamiento} debido al error: ${error}`);
    }
    return resultado;
  };

  async Actualizar(TratamientoId, tratamientoData, UsuarioIdAuditoria) {
    let resultado;
    try {
      resultado = await prisma.tratamiento.update({
        where: { TratamientoId: parseInt(TratamientoId) },
        data: { 
          DescripcionDeTratamiento: tratamientoData.DescripcionDeTratamiento,
          Token: tratamientoData.Token, 
        },
      });
      await this.registrarAuditoria(UsuarioIdAuditoria, 'Actualizar', `Se actualizó el tratamiento con ID: ${TratamientoId}`);
    } catch (error) {
      console.error(`No se pudo actualizar el tratamiento ${TratamientoId} debido al error: ${error}`);
    }
    return resultado;
  };

  async Borrar(TratamientoId, UsuarioIdAuditoria) {
    let resultado;
    try {
      // Eliminar citas asociadas al tratamiento
      await prisma.cita.deleteMany({
        where: {
          TratamientoId: parseInt(TratamientoId),
        },
      });

      // Eliminar tratamiento
      resultado = await prisma.tratamiento.delete({
        where: {
        TratamientoId: parseInt(TratamientoId),
        },
      });
      await this.registrarAuditoria(UsuarioIdAuditoria, 'Eliminar', `Se eliminó el tratamiento con ID: ${TratamientoId}`);
    } catch (error) {
      console.error(`No se pudo borrar el tratamiento ${TratamientoId} debido al error: ${error}`);
    }
    return resultado;
  };

  Listar(TratamientoId) {
    let Tratamiento;
    if (TratamientoId === undefined) {
        Tratamiento = prisma.tratamiento.findMany();
    } else {
        Tratamiento = prisma.tratamiento.findMany({
        where: {
            TratamientoId: parseInt(TratamientoId),
        },
      });
    }
    return Tratamiento;
  };
}

module.exports = Tratamientos;