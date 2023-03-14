export const  STATUS_CODES = {
    INTERNALSERVER_ERROR: 500,
    AUTHENTICATION_ERROR: 401,
    NOT_FOUND: 404,
    BADREQUEST_ERROR: 400,
    FORBIDDEN_ERROR: 403,
    CONFLICT_ERROR: 409,
    CREATED: 201,
    OK: 200,
    NO_CONTENT: 204,
  };
  
  export const ERROR_MESSAGES = {
    USER_NOT_FOUND: "No user found",
    INCORRECT_PASSWORD:"Incorrect password",
    PROVIDE_ALL_FIELDS:"Update request must have all fields inside it",
    USER_ALREADY_EXIST: "User already exists",
    PRODUCT_ALREADY_EXIST: "Product already exists",
    AUTHENTICATION:"Auth failed",
    UPDATED_SUCCESSFULLY:"UPDATED SUCCESSFULLY",
    DEACTIVATED_SUCCESSFULLY:"DEACTIVATed SUCCESSFULLY",
    DELETED_SUCCESSFULLY:"Deleted"
  };