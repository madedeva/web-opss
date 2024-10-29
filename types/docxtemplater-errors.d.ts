declare module 'docxtemplater/js/errors' {
  export class TemplateError extends Error {
    getErrors(): any;
  }
}
