exports.userPayload = (user) => {
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
    };
};
