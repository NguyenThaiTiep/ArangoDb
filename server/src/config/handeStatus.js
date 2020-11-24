module.exports.HandelStatus = (status, message, data ) => {
    switch (status) {
        case 200:
            return { status: status, message: message || "Thành công", result: data || null }
        default: 
            return { status: 500, message: message, result: data }
    }
}