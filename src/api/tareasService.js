import api from '../lib/axios';
import { handleErrorsAxios} from '../lib/handleErrors'
import { TareasSchema } from '../schemas/tareaSchema';

export const getTareas = async () => {
  try {
    const { data } = await api.get('/tarea')
    const response = TareasSchema.safeParse(data)
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

export const createTarea = async (nuevaTarea) => {
  try {
    const { data } = await api.post('/tarea', nuevaTarea)
    return data
  } catch (error) {
    handleErrorsAxios(error)
    throw error;
  }
};

export const updateTarea = async ({id, formData}) => {
  try {
    const { data } = await api.patch(`/tarea/${id}`, formData)
    return data
  } catch (error) {
    console.log(error)
    handleErrorsAxios(error)
    throw error;
  }
};
