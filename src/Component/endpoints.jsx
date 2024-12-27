const port="8000"
const url =`http://localhost:${port}/api/v1`

export const endpoints = {
    dashboard: `${url}/dashboard`,
    list_of_equipment_id: `${url}/list-of-section-id`,
    list_of_rejected_equipment_id: `${url}/list-of-rejected-equipment-id`
   
}