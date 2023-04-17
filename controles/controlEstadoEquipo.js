const estadoE=require("../Modulos/estadoEquipo");

const ObtenerEstadoEquipo= async(req, res, next)=>{
let estados;
try {
    estados=await estadoE.find();
} catch (error) {
    return next(error);
}
if(!estados){
return res.status(500).json({message: "Error Interno"})


}
return res.status(200).json(estados)

}



    const agregarEstadoEquipo = async (req = request, 
        res = response) => {
        try{
            const nombre = req.body.nombre 
                ? req.body.nombre.toUpperCase()
                : ''
            const tipoEquipoDB = await estadoE.findOne({nombre})//select * from tipoEquipo where nombre=?
            
            if(tipoEquipoDB){
                return res.status(400).json({msg: 'Ya existe'})
            }
            const data = {
                nombre  // nombre: nombre
            }
            const tipoEquipo1 = new estadoE(data)
            console.log(tipoEquipo1)
            await tipoEquipo1.save()
            return res.status(201).json(tipoEquipo1)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
    }





    const actualizarEstadoEquipo= async(req, res, next)=>{
        const id= req.params.id;


        const {nombre,estado} = req.body;
    
    if(!nombre && nombre.trim()=="" && !estado && estado.trim()=="")
    {
        return res.status(422).json({message: "Datos Incorrectos"});
    
    }
    
        let estados;
        try {
            
            estados=await estadoE.findByIdAndUpdate(id,{
                nombre,
                estado,
                fechaAct:Date.now()
            });
    
            console.log(estados);
        } catch (error) {
            return next(error);
        }
        if(!estados){
        return res.status(500).json({message: "Error  del Servidor"})
        
        
        }
        return res.status(200).json({message: "Datos Corregidos"})
        
        }


//borrar

const eliminarEstadoEquipo= async(req, res, next)=>{
    const id= req.params.id;
    let estados;

    try {
        
        estados=await estadoE.findByIdAndDelete(id);

    } catch (error) {
        return next(error);
    }
    if(!estados){
    return res.status(500).json({message: "No se puede Borrar los Datos"})
    
    
    }
    return res.status(200).json({message: "Datos Borrados"})
    
    }





exports.ObtenerEstadoEquipo=ObtenerEstadoEquipo;
exports.agregarEstadoEquipo=agregarEstadoEquipo;
exports.actualizarEstadoEquipo=actualizarEstadoEquipo;
exports.eliminarEstadoEquipo=eliminarEstadoEquipo;