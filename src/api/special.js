/* eslint-disable */
import xhr from '@/tools/http'

export const listFlowSettingUsingGET = (id) => xhr(`./api/systemManagement/flow/${id}/setting`, {method: 'get'})
