/*
 * @Author: wangjielin 876999511@qq.com
 * @Date: 2022-08-16 16:29:47
 * @LastEditors: wangjielin 876999511@qq.com
 * @LastEditTime: 2022-08-16 16:36:32
 * @FilePath: \vue-template\src\api\handleError.js
 */
/**
 * @Param: {promise} axios请求
 * @Param:{object}  其他状态码
 * @Return: {promise<[res,err]>} [res,err]
 */

const handleError = (axiosRequest, options) => {
  const { appointCode = [] } = options ?? {};
  return axiosRequest
    .then((res) => {
      if (res?.data?.code === 200) {
        return Promise.resolve([res, null]);
      } else {
        if (appointCode.includes(res?.data?.code)) {
          alert(res?.data?.message);
        }
        return Promise.resolve([res, res?.data]);
      }
    })
    .catch((err) => {
      return Promise.resolve([null, err]);
    });
};
export default handleError;
