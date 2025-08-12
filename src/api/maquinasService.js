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
  try {
    const { data } = await api.post('/maquina', nuevaMaquina)
    return data
  } catch (error) {
    handleErrorsAxios(error)
    throw error;
  }
};

export const updateMaquina = async ({id, formData}) => {
  try {
    const { data } = await api.patch(`/maquina/${id}`, formData)
    return data
    
  } catch (error) {
    handleErrorsAxios(error)
    throw error;
  }
};

export const deleteMaquina = async (id) => {
  try {
    const { data } = await api.delete(`/maquina/${id}`)
    return data;
  } catch (error) {
    handleErrorsAxios(error)
    throw error;
  }
};