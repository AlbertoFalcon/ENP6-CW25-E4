//javascript solo para redireccionar los perfiles a pagina de login y de registro
document.querySelectorAll('.profile').forEach(profile => {
    profile.addEventListener('click', () => {
        //añadir aqui la direccion de la pagina de login
        window.location.href = '../LogIn/Templates/login.html';
    });
});
document.querySelector('.add-profile').addEventListener('click', ()=> {
    //añadir aqui la direccion de la pagina de registro
    window.location.href= '../LogIn/Templates/registro.html';
})