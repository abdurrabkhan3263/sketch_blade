import { ApiResponse as TypeApiResponse } from "../types/appType";

export default class ApiResponse {
  static success({ data, message, statusCode = 200 }: TypeApiResponse) {
    return { success: true, statusCode, message, data };
  }
  static error({ message, statusCode = 500 }: TypeApiResponse) {
    return { success: false, statusCode, message };
  }
}
