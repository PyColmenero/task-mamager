data = {"2021_3_8":[["8","3","2021","GS Prog Practica T2_01","Pencil Sketch - Quoridor","H","100"],["8","3","2021","GS BBDD Examen T3","SQL","NP","0"],["8","3","2021","GS FOL Examen T3","Nota 10 - Contrato de Trabajo","H","100"],["8","3","2021","GS FOL Examen T4","naris en ingles","NP","0"],["8","3","2021","GS BBDD Examen T4","Más SQL","P","0"],["8","3","2021","GS PROG Examen T4","AWT","P","0"],["8","3","2021","GS PROG Examen T5","AWT Eventos","P","0"],["8","3","2021","GS PROG Examen T6","Exception 3","P","0"],["8","3","2021","GS PROG Examen T7","ResulSet, Statement, Connection...","P","0"]],"2021_1_11":[["11","1","2021","GS ED Practica T2_01","Nota 10 - Hacer las clases","H","100"]],"2021_1_22":[["22","1","2021","GS ED Practica T2_02","Refactorizar, Issues, Privado","H","100"],["22","1","2021","GS ED Examen T2","Nota 9'5 - Refactorización y JavaDoc","H","100"]],"2021_1_25":[["25","1","2021","GS SI Practica T6_01","Manual de instalacion de Maquinas Virutales","H","100"],["25","1","2021","GS SI Examen T6","Nota 10. Maquinas virtuales","H","100"]],"2021_2_8":[["8","2","2021","GS SI Practica T7_01","-Crear maquina virutal de Windos 10\n-Comentar cosas sobre este\n-Cambiar ajustes\n-Instalar Impresora...\n-Activar Windows","H","100"]],"2021_3_5":[["5","3","2021","GS LM Practica T4","2 Ejercicios de DTD y de XSD","H","100"]],"2021_2_9":[["9","2","2021","GS Examen LM T4","Nota 10. DTD y XSD","H","100"],["9","2","2021","GS Examen SI T7","Nota 9. Instalación Windows VMWare, bats, servicios...","H","100"]],"2021_2_17":[["17","2","2021","GS Examen LM T5","Nota 10. XPath","H","100"]],"2021_3_2":[["2","3","2021","GS Examen LM T6","XSLT","H","100"]],"2021_3_11":[["11","3","2021","GS Examen SI T8","Maquina virtual Linux","NP","0"]]}

//
function upload(){

    console.log("Creating table...");

    for (const key in data) {

        for(task = 0; task < data[key].length; task++){

            ctask = data[key][task]

            var name = ctask[3];
            var desc = ctask[4];
            var subj = "Instituto";
            var porc = ctask[6]
            var reso = ctask[5]
            var day = ctask[0]
            var mont = ctask[1]
            var year = ctask[2]
        
            new_task(name, desc, subj, porc, reso, day, mont, year, 0);
        
        }

    }


}