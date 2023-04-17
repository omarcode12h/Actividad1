const TipoEquipo=require("../Modulos/TipoEquipo");

const ObtenerDatosTipo= async(req, res, next)=>{
let tipos;
try {
    tipos=await TipoEquipo.find();
} catch (error) {
    return next(error);
}
if(!tipos){
return res.status(500).json({message: "error en el servidor"})


}
return res.status(200).json(tipos)

}


//const agregarTipo= async(req, res, next)=>{
  /*  const {nombre,estado,fechaCrea,fechaAct} = req.body;

if(!nombre && nombre.trim()=="" && !estado && estado.trim()=="")
{
    return res.status(422).json({message: "Datos Incorrectos"});

}

    let tipos;
    try {
        tipos=new tipoE({
            nombre,
            estado,
           
        });

        tipos=await tipos.save();

    } catch (error) {
        return next(error);
    }
    if(!tipos){
    return res.status(500).json({message: "Error Interno del Servidor"})
    
    
    }
    return res.status(201).json({tipos})
    */
//  }

 const agregarTipo = async (req = request, 
    res = response) => {
    try{
        const nombre = req.body.nombre 
            ? req.body.nombre.toUpperCase()
            : ''
        const tipoEquipoDB = await TipoEquipo.findOne({nombre})//select * from tipoEquipo where nombre=?
        
        if(tipoEquipoDB){
            return res.status(400).json({msg: 'Ya existe'})
        }
        const data = {
            nombre  // nombre: nombre
        }
        const tipoEquipo1 = new TipoEquipo(data)
        console.log(tipoEquipo1)
        await tipoEquipo1.save()
        return res.status(201).json(tipoEquipo1)
    }catch(e){
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}



    const actualizarDatosTipo= async(req, res, next)=>{
        const id= req.params.id;


        const {nombre,estado,fechaAct} = req.body;
    
    if(!nombre && nombre.trim()=="" && !estado && estado.trim()=="")
    {
        return res.status(422).json({message: "Datos Incorrectos"});
    
    }
    
        let tipos;
        try {
            
            tipos=await TipoEquipo.findByIdAndUpdate(id,{
                nombre,
                estado,
                fechaAct:Date.now()
            });
    
            console.log(tipos);
        } catch (error) {
            return next(error);
        }
        if(!tipos){
        return res.status(500).json({message: "Error en la salida del Servidor"})
        
        
        }
        return res.status(200).json({message: "Datos modificados"})
        
        }


//borrar

const eliminarDatosTipo= async(req, res, next)=>{
    const id= req.params.id;
    let tipos;

    try {
        
        tipos=await tipoE.findByIdAndDelete(id);

    } catch (error) {
        return next(error);
    }
    if(!tipos){
    return res.status(500).json({message: "No se pudo Borrar los Datos"})
    
    
    }
    return res.status(200).json({message: "Datos Borrados"})
    
    }





exports.ObtenerDatosTipo=ObtenerDatosTipo;
exports.agregarTipo=agregarTipo;
exports.actualizarDatosTipo=actualizarDatosTipo;
exports.eliminarDatosTipo=eliminarDatosTipo;