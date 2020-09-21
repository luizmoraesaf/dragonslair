export abstract class ArrayUtils {

    //Ordena o Array [arr] de acordo com o Campo [field]
    public static orderBy(array, field) {
        return array.sort((a, b) => {
            return a[field].toString().localeCompare(b[field].toString());
        });
    }

}