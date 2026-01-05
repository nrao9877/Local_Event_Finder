
export const Config = () =>{
    const user = JSON.parse(localStorage.getItem('user'));
    return {
        headers: {
            Authorization: `Bearer ${user.token}`
          }
    }
}