const port = import.meta.env.VITE_BACKEND_PORT
const host = import.meta.env.VITE_BACKEND_HOST
const url =`http://${host}:${port}/api/v1`

export const endpoints = {
    dashboard: `${url}/dashboard`,
    list_of_equipment_id: `${url}/list-of-section-id`,
    list_of_rejected_equipment_id: `${url}/list-of-rejected-equipment-id`
   
}