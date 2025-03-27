import {http} from '@/utils/request';

//get user info
export const getUserInfo = () => {
  return http.get('/api/get_user_info',{
    id:1
  })
}