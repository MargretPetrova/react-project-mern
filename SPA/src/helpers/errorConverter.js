export default function convertError(err){
    if ((typeof err) === 'string') {
        return err
    } else if((typeof err) === 'object'){
        return err.message
    }
}