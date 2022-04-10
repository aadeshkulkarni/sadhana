export function convertDate(today){
    var year = today.getFullYear();
    var mes = today.getMonth()+1;
    var dia = today.getDate();
    var fecha =dia+"-"+mes+"-"+year;
    return fecha;
}
export function convertToJSDate(date){
    const values=date.split('-');
    return `${values[1]}-${values[0]}-${values[2]}`
}