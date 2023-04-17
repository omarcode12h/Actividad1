const Marcas=require("../Modulos/marcas");

const ObtenerMarcas= async(req, res, next)=>{
let marcas;
try {
    marcas=await Marcas.find();
} catch (error) {
    return next(error);
}
if(!marcas){
return res.status(500).json({message: "error en el servidor"})


}
return res.status(200).json(marcas)

}

const agregarMarcas = async (req = request, 
    res = response) => {
    try{
        const nombre = req.body.nombre 
            ? req.body.nombre.toUpperCase()
            : ''
        const tipoEquipoDB = await Marcas.findOne({nombre})//select * from tipoEquipo where nombre=?
        
        if(tipoEquipoDB){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre  // nombre: nombre
        }
        const tipoEquipo1 = new Marcas(data)
        console.log(tipoEquipo1)
        await tipoEquipo1.save()
        return res.status(201).json(tipoEquipo1)
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}



    const actualizarMarcas= async(req, res, next)=>{
        const id= req.params.id;


        const {nombre,estado} = req.body;
    
    if(!nombre && nombre.trim()=="" && !estado && estado.trim()=="")
    {
        return res.status(422).json({message: "Datos Incorrectos"});
    
    }
    
        let marcas;
        try {
            
            marcas=await Marcas.findByIdAndUpdate(id,{
                nombre,
                estado
                
            });
    
            console.log(marcas);
        } catch (error) {
            return next(error);
        }
        if(!marcas){
        return res.status(500).json({message: "Error Interno saliente del servidor"})
        
        
        }
        return res.status(200).json({message: "Datos Modificados"})
        
        }


//borrar

const eliminarMarcas= async(req, res, next)=>{
    const id= req.params.id;
    let marcas;

    try {
        
        marcas=await marcasEquipos.findByIdAndDelete(id);

    } catch (error) {
        return next(error);
    }
    if(!marcas){
    return res.status(500).json({message: "No se pudo Borrar los Datos"})
    
    
    }
    return res.status(200).json({message: "Datos Borrados Correctamente"})
    
    }





exports.ObtenerMarcas=ObtenerMarcas;
exports.agregarMarcas=agregarMarcas;
exports.actualizarMarcas=actualizarMarcas;
exports.eliminarDatosTipo=eliminarMarcas;