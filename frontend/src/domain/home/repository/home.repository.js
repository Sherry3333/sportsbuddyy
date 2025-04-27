import {http} from '@/utils/request';

//get sports list
export const _getSportsList = () => {
  return http.get('/api/sport/list')
}

