//Match for dates in dd-mm-yyyy & yyyy-mm-dd formats
export const dateStringRegExp =
    /^(?:(\d{4})([-./])(\d{2})(\2)(\d{2})|(\d{2})([-./])(\d{2})(\7)(\d{4}))$/
