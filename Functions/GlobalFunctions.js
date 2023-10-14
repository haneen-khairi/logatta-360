export function logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token')
    
}