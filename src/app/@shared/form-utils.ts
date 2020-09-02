export abstract class FormUtils {

  // Método responsável por validar um formControl
  public static checkFormControlValidity(formControl): boolean {
    return formControl.valid;
  }

  // Método responsável por verificar se o formControl foi tocado
  public static checkIfFormControlIsTouched(formControl): boolean {
    return formControl.touched;
  }

}