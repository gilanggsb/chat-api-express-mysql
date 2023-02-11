class UserModel {
    #isDeleted = 0;
    constructor({ uuid, name, username, email, gender, phone, address, city, created_at, deleted_at, is_deleted }) {
        this.userId = uuid;
        this.name = name;
        this.username = username;
        this.email = email;
        this.gender = gender;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this.createdAt = created_at;
        this.#isDeleted = is_deleted;
    }

    getIsDeleted = () => this.#isDeleted;
}

module.exports = UserModel;