import api from '../lib/axios';
import { handleErrorsAxios} from '../lib/handleErrors'
import { MaquinasSchema } from '../schemas/maquinaSchema';

export const getMaquinas = async () => {
  try {
    const { data } = await api.get('/maquina')
    const response = MaquinasSchema.safeParse(data)
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

export const createMaquina = async (nuevaMaquina) => {
  const response = await api.post('/maquina', nuevaMaquina)
  return response.data;
};

export const updateMaquina = async (id, data) => {
  const response = await api.put(`/maquina/${id}`, data)
  return response.data;
};

export const deleteMaquina = async (id) => {
  const response = await api.delete(`/maquina/${id}`)
  return response.data;
};