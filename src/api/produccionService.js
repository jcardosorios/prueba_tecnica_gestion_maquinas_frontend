import api from '../lib/axios';
import { handleErrorsAxios} from '../lib/handleErrors'
import { ProduccionesSchema } from '../schemas/produccionSchema';

export const getProducciones = async () => {
  try {
    const { data } = await api.get('/produccion')
    const response = ProduccionesSchema.safeParse(data)
    // return data
    if(response.success){
      return response.data
    } else {
      throw new Error('Error de validación del esquema de datos.')
    }
  } catch (error) {
    handleErrorsAxios(error)
    throw error;
  }
};