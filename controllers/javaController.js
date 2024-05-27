exports.comprobarUsuario = async (req, res) => {
    const { username, contrasena } = req.query;

    try {
        // Lógica para comprobar el usuario y contraseña
        // Esto puede variar dependiendo de cómo esté implementado tu sistema de usuarios
        const usuarioValido = await UsuarioService.comprobarUsuario(username, contrasena);

        if (usuarioValido) {
            res.status(200).send("Usuario válido");
        } else {
            res.status(401).send("Usuario inválido");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno");
    }
};