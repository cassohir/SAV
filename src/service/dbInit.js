


let db;
let colunas = [];
let fileHandle;

//fileHandle = await getFileHandle();

     
const  getFileHandle = async () =>{
    const [fileHandle]  = await window.showOpenFilePicker({
        type: 'openFile',
        accepts: [{
          extensions: ['sqlite', 'db']
        }]
      });

      return fileHandle;
}
 

export function getEntidade() {


}

