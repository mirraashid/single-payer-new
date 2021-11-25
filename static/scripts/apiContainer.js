export const fetchData = (payload) => axios({
    method: 'POST',
    url: '/singlePayer/fetch/calc',
    data: payload
});