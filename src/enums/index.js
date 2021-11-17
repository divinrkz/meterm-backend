const EUserType = {
    ADMIN: 'ADMIN',
    NORMAL: 'NORMAL',
    EMPLOYEE: 'EMPLOYEE'
};

const EUserStatus = {
    PENDING: 'PENDING',
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE'
};

const EEmployeeAccess = {
    PENDING: 'PENDING',
    GRANTED: 'GRANTED',
    DENIED: 'DENIED'
};


const EEmployeeType = {
    PENDING: 'PENDING',
    QA_STAFF: 'QA_STAFF',
    NORMAL: 'NORMAL'
};


const EProductStatus = {
    PENDING: 'PENDING',
    APPROVED_FOR_EXPORTATION: 'APPROVED_FOR_EXPORTATION',
    REJECTED_FOR_EXPORTATION: 'REJECTED_FOR_EXPORTATION'
};


module.exports = {EUserType, EUserStatus, EEmployeeType, EEmployeeAccess, EProductStatus};