import { isAxiosError } from "axios"

export function handleErrorsAxios(error) {
    if (isAxiosError(error) && error.response) {
        const errors = error.response.data.errors
        if (Array.isArray(errors)) {
            throw errors.map(err => err.msg)
        } else {
            throw new Error(Object.values(errors)[0])
        }
    }
    throw new Error("Falló comunicación con el servidor")
}